import { Module } from '@nestjs/common';
import { DatabaseService } from './databse.service';
import { DatabaseUserService } from './databse.serviceuser';

@Module({
  // providers: [DatabaseService , DatabaseUserService],
  // exports:[DatabaseService]
})
export class DatabseModule {}
