import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { CreateRecordDto } from './dto/createRecordDto';
import { UpdateRecordDto } from './dto/updateRecordDto';
import { Cache } from 'cache-manager';
import { StorageRepository } from './storage.repository';

export interface DbRecord {
  id: number;
  name: string;
  amount: number;
} /// id,name,amount

@Injectable()
export class StorageService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private storageRepository: StorageRepository,
  ) {}

  async create(dto: CreateRecordDto) {
    return this.storageRepository.createStorage(dto);
    /* this.cacheManager.set(`storage-${newId}`, newRecord);
    this.db.push(newRecord);
    return newRecord; */
  }

  async getById(id: number) {
    console.log('23232');
    //const recordRedis = await this.cacheManager.get<DbRecord>(`storage-${id}`);
    /* if (recordRedis) {
      console.log(console.log('from redis'));
      return recordRedis;
    } */
    /* const record = this.db.find((value) => value.id === id); */
    return await this.storageRepository.getByIdStorage(id);
    /* if (record !== undefined) {
      await this.cacheManager.set(`storage-${id}`, record);
      return record;
    }
    return null; */
  }

  async getAll() {
    console.log('1');
    //const db = await this.cacheManager.get<DbRecord[]>('storage-all');
    return this.storageRepository.getAllStorage();
    /* console.log('from db');
    this.cacheManager.set('storage-all', this.db);
    return this.db; */
  }

  update(id: number, data: UpdateRecordDto) {
    /* const findIndex = this.db.findIndex((record) => record.id === id);
    if (findIndex !== -1) {
      const newRecord = { ...this.db[findIndex], ...data };
      this.db[findIndex] = newRecord;
      this.cacheManager.set(`storage-${id}`, newRecord);
      return this.db[findIndex];
    }
    return null; */

    return this.storageRepository.updateByIdStorage(id, data);
  }

  async deleteById(id: number) {
    /*  const index = this.db.findIndex((record) => record.id === id);
    if (index === -1) {
      return null;
    }
    this.cacheManager.del(`storage-${id}`);
    this.db.splice(index, 1); */
    this.storageRepository.deleteByIdStorage(id);
  }
}
