import {
  BadRequestException,
  Body,
  Controller,
  FileTypeValidator,
  ParseFilePipe,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { PhotoService } from './photo.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UploadPhotoDTO } from './photo.dto';
import { UserInfo } from 'src/helper/common.decorator';
import { User } from 'src/user/user.entity';

const fileTypePipe = new ParseFilePipe({
  validators: [
    new FileTypeValidator({
      fileType: /image\/(svg|png|webp|gif|jpe?g)/,
    }),
  ],
});

@Controller('photo')
export class PhotoController {
  constructor(private ps: PhotoService) {}

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files'))
  async upload(
    @UploadedFiles(fileTypePipe) files: Express.Multer.File[],
    @Body() data: UploadPhotoDTO,
    @UserInfo() user: User,
  ) {
    if (!files.length) {
      throw new BadRequestException('未找到文件');
    }
    return this.ps.upload(user, data.type, files);
  }
}
