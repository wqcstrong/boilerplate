// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as OSS from 'ali-oss';

@Injectable()
export class OssService {
  private oss: OSS;

  constructor(private configService: ConfigService) {
    const ossConfig = this.configService.get('oss');
    this.oss = new OSS(ossConfig);
  }

  // 初始化当前用户目录
  async initNamespace(filename: string) {
    return await this.oss.put(filename, Buffer.from(''));
  }

  // 上传文件
  async uploadFile(filename: string, file: Buffer) {
    return this.oss.put(filename, file);
  }

  // 设置 Object 为公共读（避免无法访问）
  async setObjectPublicRead(filename: string) {
    return this.oss.putACL(filename, 'public-read');
  }
}
