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
