import {
  IsEnum,
  IsOptional,
  IsString,
  Length,
  ValidateIf,
  isNotEmpty,
} from 'class-validator';
import { DocType } from './doc.entity';
import { IntersectionType, PartialType } from '@nestjs/mapped-types';

export class DocDTO {
  @Length(1, 100, { message: '名称长度范围 1~100' })
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  desc: string;

  @IsOptional()
  content: any;

  @IsOptional()
  isStar: boolean;

  @IsEnum(DocType, { message: '节点类型错误' })
  type: DocType;

  @IsString()
  @ValidateIf((_, value) => isNotEmpty(value))
  parentId: string;
}

export class DocWithIdDTO {
  @IsString()
  id: string;
}

export class UpdateDocDTO extends IntersectionType(
  PartialType(DocDTO),
  DocWithIdDTO,
) {}
