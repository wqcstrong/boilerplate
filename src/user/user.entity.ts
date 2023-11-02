import { Column, Entity, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { CommonEntity } from '../helper/common-entity';
import { Doc } from '../doc/doc.entity';

@Entity()
export class User extends CommonEntity {
  constructor(user: Partial<User> = {}) {
    super();
    Object.assign(this, user);
  }

  @Column()
  username: string;

  @Column()
  @Exclude()
  password: string;

  @Column({
    nullable: true,
    type: 'text',
  })
  avatar: string;

  @Column('json', { nullable: true })
  config: string;

  @OneToMany(() => Doc, (doc) => doc.author, {
    cascade: true,
  })
  doc: Doc[];
}
