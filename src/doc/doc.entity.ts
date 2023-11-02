import { CommonEntity } from '../helper/common-entity';
import { User } from '../user/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';

export enum DocType {
  Directory = 'directory',
  Markdown = 'markdown',
  Album = 'album',
}

@Entity()
@Tree('closure-table', {
  ancestorColumnName: (column) => 'parent_' + column.propertyName,
  descendantColumnName: (column) => 'child_' + column.propertyName,
})
export class Doc extends CommonEntity {
  constructor(data: Partial<Doc> = {}) {
    super();
    Object.assign(this, data);
  }

  @Column({
    type: 'enum',
    enum: DocType,
    default: DocType.Directory,
  })
  type: DocType;

  @Column({ length: 100 })
  title: string;

  @Column({ nullable: true })
  desc: string;

  @Column({ type: 'simple-json', nullable: true })
  content: object;

  @Column('bool', {
    default: false,
  })
  isStar: boolean;

  @TreeParent({ onDelete: 'CASCADE' })
  parent: Doc;

  @TreeChildren()
  children: Doc[];

  @ManyToOne(() => User, (user) => user.doc)
  author: User;
}
