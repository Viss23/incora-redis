import { Injectable } from '@nestjs/common';
import { AppDataSource } from 'src/config/data-source';
import { DataSource, Repository } from 'typeorm';
import { UpdateRecordDto } from './dto/updateRecordDto';
import { Storage } from './enteties/storage.entity';

@Injectable()
export class StorageRepository extends Repository<Storage> {
  constructor(private dataSource: DataSource) {
    super(Storage, dataSource.createEntityManager());
  }

  async createStorage(data) {
    console.log('12');
    return await this.insert(data);
  }

  async getByIdStorage(id) {
    return this.find({ where: { id } });
  }

  async getAllStorage() {
    console.log('orm');
    return this.find();
  }

  async deleteByIdStorage(id) {
    return this.delete(id);
  }

  async updateByIdStorage(id, data: UpdateRecordDto) {
    return this.update({ id: id }, data);
  }
}
