import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Doc, DocType } from './doc.entity';
import { TreeRepository } from 'typeorm';
import { User } from 'src/user/user.entity';
import { DocDTO, UpdateDocDTO } from './doc.dto';
import * as _ from 'lodash';

export const defaultRootDoc = ['我的文档', '收藏夹', '回收站'];

@Injectable()
export class DocService {
  constructor(
    @InjectRepository(Doc) private docRepo: TreeRepository<Doc>,
  ) {}

  async findDoc(id: string | null, user: User) {
    const doc = await this.docRepo.findOneOrFail({
      where: {
        id,
      },
      relations: ['author'],
    });

    const { author, ...rest } = doc;
    if (author.id !== user.id) {
      throw new ForbiddenException('请求有误');
    }
    return rest;
  }

  async create(data: DocDTO, user: User) {
    const { parentId, ...rest } = data;
    const newDoc = new Doc(rest);
    newDoc.author = user;

    let parent: Doc | null = null;
    if (parentId) {
      parent = await this.docRepo
        .createQueryBuilder('doc')
        .where('doc.id = :id AND doc.authorId = :uid', {
          id: parentId,
          uid: user.id,
        })
        .getOne();
      if (!parent) {
        throw new BadRequestException('parent 节点不存在');
      }
      if (parent.type !== DocType.Directory) {
        throw new BadRequestException('只能在目录下创建文档');
      }
      // 查找同级下会不会名称冲突
      const isExist = await this.docRepo
        .createDescendantsQueryBuilder('doc', 'docClosure', parent)
        .andWhere('doc.title = :title', { title: newDoc.title })
        .getOne();
      if (isExist) {
        throw new BadRequestException('名称已存在');
      }
    }
    newDoc.parent = parent;

    return this.docRepo.save(newDoc);
  }

  async update({ id, ...args }: UpdateDocDTO, user: User) {
    const doc = await this.docRepo.findOneOrFail({
      where: {
        id,
      },
      relations: ['author'],
    });
    const { author } = doc;
    if (author.id !== user.id) {
      throw new ForbiddenException('请求有误');
    }
    const updatedDoc = { ...doc, ...args };
    return this.docRepo.save(updatedDoc);
  }

  async change({ id, ...args }: UpdateDocDTO) {
    const { affected } = await this.docRepo
      .createQueryBuilder('doc')
      .update(Doc)
      .set(args)
      .where('id = :id', { id })
      .execute();

    return affected === 1;
  }

  async getRoots(user: User) {
    const data = await this.docRepo
      .createQueryBuilder('doc')
      .where('doc.parentId IS NULL')
      .andWhere('doc.authorId = :id', { id: user.id })
      .getMany();
    const roots = _.sortBy(data, (item) =>
      _.indexOf(defaultRootDoc, item.title),
    );
    return roots;
  }

  async getRootsAndDocsCount(user: User) {
    const [myZone, staredZone, deletedZone] = await this.getRoots(
      user,
    );
    const data = await this.docRepo
      .createQueryBuilder()
      .select('COUNT(DISTINCT child.id)', 'count')
      .from(Doc, 'parent')
      .leftJoin('parent.children', 'child')
      .where('parent.id = :pid', { pid: myZone.id })
      .getRawOne();
    const queryByType = this.docRepo.createDescendantsQueryBuilder(
      'doc',
      'docClosure',
      myZone,
    );
    const [myZoneCount, staredZoneCount, deletedZoneCount] =
      await Promise.all([
        data.count,
        queryByType.clone().andWhere('doc.isStar = 1').getCount(),
        queryByType
          .clone()
          .andWhere('doc.deletedAt IS NOT NULL')
          .withDeleted()
          .getCount(),
      ]);

    return [
      { ...myZone, docCount: myZoneCount },
      { ...staredZone, docCount: staredZoneCount },
      { ...deletedZone, docCount: deletedZoneCount },
    ];
  }

  async getAllTrees(user: User) {
    const roots = await this.getRoots(user);
    return Promise.all(
      roots.map((doc) => this.docRepo.findDescendantsTree(doc)),
    );
  }

  async getDocDescendants(id: string) {
    const doc = await this.docRepo.findOne({
      where: {
        id,
      },
      relations: ['author', 'parent'],
    });
    if (!doc) {
      throw new BadRequestException('文档不存在');
    }

    const query = this.docRepo
      .createQueryBuilder('doc')
      .orderBy('doc.updatedAt', 'DESC')
      .where('doc.authorId = :uid', {
        uid: doc.author.id,
      });
    if (doc.parent === null) {
      switch (doc.title) {
        case '收藏夹':
          const starDocs = await query
            .andWhere('doc.isStar = 1')
            .getMany();
          return { ...doc, children: starDocs };
        case '回收站':
          const deletedDocs = await query
            .andWhere('doc.deletedAt IS NOT NULL')
            .withDeleted()
            .getMany();
          return { ...doc, children: deletedDocs };
      }
    }

    return query
      .andWhere('doc.id = :id', { id: doc.id })
      .leftJoinAndSelect('doc.children', 'child')
      .getOne();
  }

  async softDeleteDoc(id: string, user: User) {
    const doc = await this.docRepo
      .createQueryBuilder('doc')
      .addSelect('doc.deletedAt')
      .where('doc.id = :id AND doc.authorId = :uid', {
        id,
        uid: user.id,
      })
      .getOne();
    if (!doc) {
      throw new BadRequestException('未找到请求删除的文档');
    }
    await this.docRepo.softRemove(doc);
    return true;
  }

  async restoreDoc(id: string, user: User) {
    const doc = await this.docRepo
      .createQueryBuilder('doc')
      .restore()
      .where('doc.id = :id AND doc.authorId = :uid', {
        id,
        uid: user.id,
      })
      .execute();
    return doc.affected === 1;
  }

  async deleteDoc(id: string, user: User) {
    return this.docRepo
      .createQueryBuilder()
      .delete()
      .from(Doc)
      .where('doc.id = :id AND doc.authorId = :uid', {
        id,
        uid: user.id,
      })
      .execute();
  }
}
