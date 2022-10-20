import {
  Body,
  CacheInterceptor,
  CacheKey,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { CreateRecordDto } from './dto/createRecordDto';
import { UpdateRecordDto } from './dto/updateRecordDto';
import { DbRecord, StorageService } from './storage.service';

@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Post('')
  async create(@Body() dto: CreateRecordDto) {
    return this.storageService.create(dto);
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    console.log('123');
    return this.storageService.getById(parseInt(id));
  }

  @CacheKey('getAll')
  @Get()
  async getAll() {
    console.log('getAll');
    return this.storageService.getAll();
  }

  @Put(':id')
  async updateById(@Param('id') id: string, @Body() dto: UpdateRecordDto) {
    return this.storageService.update(parseInt(id), dto);
  }
}
