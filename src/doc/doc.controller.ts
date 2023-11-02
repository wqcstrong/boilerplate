import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { DocService } from './doc.service';
import { DocDTO, DocWithIdDTO, UpdateDocDTO } from './doc.dto';
import { UserInfo } from 'src/helper/common.decorator';
import { User } from 'src/user/user.entity';

@Controller('doc')
export class DocController {
  constructor(private readonly docService: DocService) {}

  @Get()
  async findDoc(
    @UserInfo()
    user: User,
    @Query()
    { id }: DocWithIdDTO,
  ) {
    return this.docService.findDoc(id, user);
  }

  @Post()
  async createDoc(@UserInfo() user: User, @Body() doc: DocDTO) {
    return this.docService.create(doc, user);
  }

  // 软删除
  @Delete()
  async softDeleteDoc(
    @UserInfo() user: User,
    @Body() { id }: DocWithIdDTO,
  ) {
    return this.docService.softDeleteDoc(id, user);
  }

  // 恢复(软删除)
  @Post('restore')
  async restoreDoc(
    @UserInfo() user: User,
    @Body() { id }: DocWithIdDTO,
  ) {
    return this.docService.restoreDoc(id, user);
  }

  // 物理删除
  @Delete('/delete')
  async deleteDoc(
    @UserInfo() user: User,
    @Body() { id }: DocWithIdDTO,
  ) {
    return this.docService.deleteDoc(id, user);
  }

  @Post('update')
  async updateDoc(@UserInfo() user: User, @Body() doc: UpdateDocDTO) {
    return this.docService.update(doc, user);
  }

  // 客户端随手保存
  @Post('change')
  async changeDoc(@Body() doc: UpdateDocDTO) {
    return this.docService.change(doc);
  }

  @Get('root')
  getRootDocs(@UserInfo() user: User) {
    return this.docService.getRootsAndDocsCount(user);
  }

  @Get('all')
  getAllTrees(@UserInfo() user: User) {
    return this.docService.getAllTrees(user);
  }

  @Get('children')
  getDocDescendants(@Query() doc: DocWithIdDTO) {
    return this.docService.getDocDescendants(doc.id);
  }
}
