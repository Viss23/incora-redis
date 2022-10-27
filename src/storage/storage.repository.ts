import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateRecordDto } from './dto/updateRecordDto';
import { Storage } from './enteties/storage.entity';
import { IStorageRepository } from './storage.repository.interface';

@Injectable()
export class StorageRepository
  extends Repository<Storage>
  implements IStorageRepository
{
  constructor(
    @InjectRepository(Storage)
    repository: Repository<Storage>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async createStorage(data) {
    const result = await this.createQueryBuilder()
      .insert()
      .into(Storage)
      .values(data)
      .returning('*')
      .execute();
    return result.raw[0];
  }

  async getByIdStorage(id: number) {
    const a = this.findOne({ where: { id } });
    return a;
  }

  async getAllStorage() {
    return this.find();
  }

  async deleteByIdStorage(id) {
    return this.delete(id);
  }

  async updateByIdStorage(id, data: UpdateRecordDto) {
    const result = await this.createQueryBuilder()
      .update({
        ...data,
      })
      .where({
        id,
      })
      .returning('*')
      .execute();
    return result.raw[0];
  }
}
