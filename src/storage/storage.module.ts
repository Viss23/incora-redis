import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StorageController } from './storage.controller';
import { StorageRepository } from './storage.repository';
import { StorageService } from './storage.service';
import { Storage } from './enteties/storage.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Storage])],
  controllers: [StorageController],
  providers: [StorageService, StorageRepository],
})
export class StorageModule {}
