import { UpdateRecordDto } from './dto/updateRecordDto';
import { Storage } from './enteties/storage.entity';

export interface IStorageRepository {
  createStorage(data);
  getByIdStorage(id: number): Promise<Storage>;
  getAllStorage(): Promise<Storage[]>;
  deleteByIdStorage(id: number): void;
  updateByIdStorage(id: number, data: UpdateRecordDto): Promise<Storage>;
  updateAll(data: Storage[]): Promise<Storage[]>;
}
