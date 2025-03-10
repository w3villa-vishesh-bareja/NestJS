import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthModule } from 'src/auth/auth.module';
import { DatabseModule } from 'src/databse/databse.module';

@Module({
  imports:[DatabseModule , AuthModule],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
