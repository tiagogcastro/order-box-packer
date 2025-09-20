import { AuthController } from '@/modules/auth/controllers/auth.controller';
import { JwtAuthGuard } from '@/modules/auth/jwt-auth.guard';
import { AuthRepository } from '@/modules/auth/repositories/auth.repository';
import { GenerateTokenUseCase } from '@/modules/auth/usecases/generate-token.usecase';
import { ValidateUserUseCase } from '@/modules/auth/usecases/validate-user.usecase';
import { UsersModule } from '@/modules/users/users.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

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
    ValidateUserUseCase,
    GenerateTokenUseCase,
    AuthRepository,
    JwtAuthGuard,
  ],
  controllers: [
    AuthController
  ],
  exports: [
    AuthRepository,
    JwtAuthGuard
  ],
})
export class AuthModule { }
