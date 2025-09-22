import { JwtService } from '@/shared/services/jwt/jwt.service';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '24h'
      },
    }),
  ],
  providers: [
    JwtService
  ],
  exports: [
    JwtService
  ],
})
export class JwtSharedModule { }
