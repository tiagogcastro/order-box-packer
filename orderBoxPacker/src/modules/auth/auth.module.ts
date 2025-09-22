import { AuthController } from '@/modules/auth/controllers/auth.controller';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { UsersModule } from '@/modules/users/users.module';
import { BcryptService } from '@/shared/services/bcrypt/bcrypt.service';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './services/auth.service';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [
    JwtAuthGuard,
    AuthService,
    BcryptService
  ],
  controllers: [
    AuthController
  ],
  exports: [
    JwtAuthGuard
  ],
})
export class AuthModule { }
