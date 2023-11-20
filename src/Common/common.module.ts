import { Module } from '@nestjs/common';
import { DatabaseModule } from './Databases/database.module';

@Module({
  imports: [DatabaseModule],
  exports: [DatabaseModule],
})
export class CommonModule { }
