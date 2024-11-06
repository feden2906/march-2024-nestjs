import { Module } from '@nestjs/common';

import { FileStorageService } from './services/file-storage.service';

@Module({
  imports: [],
  controllers: [],
  providers: [FileStorageService],
  exports: [FileStorageService],
})
export class FileStorageModule {}
