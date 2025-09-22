import { UsersRepository } from '@/modules/users/repositories/users.repository';
import { BcryptService } from '@/shared/services/bcrypt/bcrypt.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
    private readonly bcryptService: BcryptService,
  ) { }

  async validateUser(username: string, password: string) {
    const user = await this.usersRepository.findByUsername(username);

    if (!user) {
      return {
        data: null,
        error: {
          message: 'Usuário não encontrado',
          error: 'USER_NOT_FOUND',
        },
      };
    }

    const isPasswordValid = await this.bcryptService.compare(password, user.password);

    if (!isPasswordValid) {
      return {
        data: null,
        error: {
          message: 'Senha incorreta',
          error: 'INVALID_PASSWORD',
        },
      };
    }

    const { password: _, ...result } = user;

    return {
      data: result,
      error: null,
    };
  }

  async generateToken(username: string, password: string) {
    const validateUserResult = await this.validateUser(username, password);

    if (validateUserResult.error) {
      return validateUserResult;
    }

    const user = validateUserResult.data;

    const payload = {
      sub: user.id,
      username: user.username,
    };

    return {
      access_token: this.jwtService.sign(payload),
      token_type: 'Bearer',
      expires_in: '24h',
      user: {
        id: user.id,
        username: user.username,
      },
    };
  }

  async verifyToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch {
      return {
        data: null,
        error: {
          message: 'Token inválido ou expirado',
          error: 'INVALID_TOKEN',
        },
      };
    }
  }
}
