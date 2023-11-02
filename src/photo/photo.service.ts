import { Injectable } from '@nestjs/common';
import { OssService } from 'src/oss/oss.service';
import { User } from 'src/user/user.entity';
import { PhotoType } from './photo.entity';

@Injectable()
export class PhotoService {
  constructor(private ossService: OssService) {}

  async upload(
    user: User,
    type: PhotoType,
    files: Express.Multer.File[],
  ) {
    const tasks = files.map(async (file) => {
      const filename = `${user.username}/${file.originalname}`;
      const { name, url } = await this.ossService.uploadFile(
        filename,
        file.buffer,
      );
      await this.ossService.setObjectPublicRead(filename);
      return {
        url,
        name,
        size: file.size,
      };
    });
    const uploadTask = await Promise.all(tasks);
    console.log({ uploadTask });
    return true;
  }
}
