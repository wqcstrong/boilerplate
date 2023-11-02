import { IsEnum, IsNotEmpty } from 'class-validator';
import { PhotoType } from './photo.entity';

export class UploadPhotoDTO {
  @IsEnum(PhotoType, { message: 'type 选项: "material" || "camera"' })
  @IsNotEmpty()
  type: PhotoType;
}
