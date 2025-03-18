import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { DatabseModule } from './databse/databse.module';
import { SequelizeModule } from '@nestjs/sequelize';
import {User} from '../models/user.model'


@Module({
  controllers: [],
  imports: [ SequelizeModule.forRoot({
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: 'password',
    database: 'database_development',
    models: [User],
    autoLoadModels: true, 
    synchronize: false, 
  }) ],
})
export class AppModule {}
