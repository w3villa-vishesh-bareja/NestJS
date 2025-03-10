import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
        secret: 'akfalkdsmf', 
        signOptions: { expiresIn: '1d' }, 
    }),
],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
