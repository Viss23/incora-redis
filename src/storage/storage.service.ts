import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { CreateRecordDto } from './dto/createRecordDto';
import { UpdateRecordDto } from './dto/updateRecordDto';
import { Cache } from 'cache-manager';

import { StorageRepository } from './storage.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { RedisStore } from 'cache-manager-redis-store';

export interface DbRecord {
  id: number;
  name: string;
  amount: number;
} /// id,name,amount

@Injectable()
export class StorageService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectRepository(StorageRepository)
    private storageRepository: StorageRepository,
  ) {}

  async create(dto: CreateRecordDto) {
    const newRecord = await this.storageRepository.createStorage(dto);
    const { id } = newRecord;
    this.cacheManager.set(`storage-${id}`, newRecord);
    return newRecord;
  }

  async getById(id: number) {
    const recordRedis = await this.cacheManager.get<Storage>(`storage-${id}`);
    if (recordRedis) {
      return recordRedis;
    }
    const record = await this.storageRepository.getByIdStorage(id);
    this.cacheManager.set(`storage-${id}`, record);
    return record;
  }

  async getAll() {
    const keys = await this.cacheManager.store.keys('storage-*');
    const allData: Storage[] = [];
    for (const key of keys) {
      allData.push(await this.cacheManager.get(key));
    }
    return allData;
  }

  async update(id: number, data: UpdateRecordDto) {
    const updatedRecord = await this.storageRepository.updateByIdStorage(
      id,
      data,
    );
    this.cacheManager.set(`storage-${id}`, updatedRecord);
    return updatedRecord;
  }

  async deleteById(id: number) {
    this.storageRepository.deleteByIdStorage(id);
    this.cacheManager.del(`storage-${id}`);
  }
}
