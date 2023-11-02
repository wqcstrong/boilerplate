import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { Doc, DocType } from 'src/doc/doc.entity';
import { defaultRootDoc } from 'src/doc/doc.service';
import { OssService } from 'src/oss/oss.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private ossService: OssService,
  ) {}

  findOneByName(username: string) {
    return this.userRepo
      .createQueryBuilder('user')
      .where('user.username = :username', { username })
      .getOne();
  }

  async findOneById(id: string) {
    const user = await this.userRepo
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .getOne();
    if (!user) {
      throw new UnauthorizedException('获取用户信息失败');
    }
    return user;
  }

  async create(user: User) {
    await this.ossService.initNamespace(user.username);

    user.doc = defaultRootDoc.map(
      (title) =>
        new Doc({
          title,
          type: DocType.Directory,
          desc: '默认文件夹',
          parent: null,
        }),
    );
    return this.userRepo.save(user);
  }
}
