import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';

@Injectable()
export class JwtService {
  constructor(private readonly jwtService: NestJwtService) { }

  sign(payload: any, expiresIn = '24h') {
    return this.jwtService.sign(payload, {
      expiresIn
    });
  }

  verify(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch {
      return {
        data: null,
        error: {
          message: 'Token inválido ou expirado',
          error: 'INVALID_TOKEN'
        }
      }
    }
  }

  decode(token: string) {
    return this.jwtService.decode(token);
  }
}
