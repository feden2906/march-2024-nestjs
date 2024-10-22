import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class CreateUpdateModel {
  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
