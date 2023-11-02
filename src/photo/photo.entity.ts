import { CommonEntity } from '../helper/common-entity';
import { Column, Entity } from 'typeorm';

export enum PhotoType {
  // 素材
  Material = 'material',
  // 相片
  Camera = 'camera',
}

@Entity()
export class Photo extends CommonEntity {
  @Column({
    type: 'enum',
    enum: PhotoType,
    default: PhotoType.Material,
  })
  type: PhotoType;

  @Column()
  name: string;

  @Column()
  url: string;

  @Column()
  size: number;

  @Column({ nullable: true })
  width: number;

  @Column({ nullable: true })
  height: number;

  @Column({ nullable: true })
  primary_color: string;
}
