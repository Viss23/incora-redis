import {
  Body,
  CacheKey,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CreateRecordDto } from './dto/createRecordDto';
import { UpdateRecordDto } from './dto/updateRecordDto';
import { StorageService } from './storage.service';

@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

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

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  @Post('/updateDb')
  async updateDbFromRedis() {
    return this.storageService.updateDb();
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
}
