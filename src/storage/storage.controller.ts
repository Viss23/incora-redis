import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MailService } from 'src/mail/mail.service';
import { CreateRecordDto } from './dto/createRecordDto';
import { UpdateRecordDto } from './dto/updateRecordDto';
import { SEND_IMAGE_TO_EMAIL } from './storage.constants';
import { StorageService } from './storage.service';

@Controller('storage')
export class StorageController {
  constructor(
    private readonly storageService: StorageService,
    private mailService: MailService,
  ) {}

  @Post('')
  async create(@Body() dto: CreateRecordDto) {
    return this.storageService.create(dto);
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return this.storageService.getById(id);
  }

  @Get()
  async getAll() {
    return this.storageService.getAll();
  }

  @Put(':id')
  async updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateRecordDto,
  ) {
    return this.storageService.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    this.storageService.deleteById(id);
  }

  @Post('/sendImageToEmail')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (file.mimetype.includes('image')) {
      await this.storageService.saveFile(file);
      await this.mailService.sendImageToEmail(file);
    } else {
      throw new HttpException(SEND_IMAGE_TO_EMAIL, HttpStatus.BAD_REQUEST);
    }
  }
}
