import {
  ValidateUserRequestDto
} from '@/modules/auth/dtos/validate-user.dto';
import { UsersRepository } from '@/modules/users/repositories/users.repository';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class ValidateUserUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
  ) { }

  async execute(request: ValidateUserRequestDto) {
    try {
      const { username, password } = request;

      const user = await this.usersRepository.findByUsername(username);

      if (!user) {
        return {
          data: null,
          error: {
            message: 'Usuário não encontrado',
            error: 'USER_NOT_FOUND',
          }
        };
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return {
          data: null,
          error: {
            message: 'Senha incorreta',
            error: 'INVALID_PASSWORD',
          }
        };
      }

      const { password: _, ...result } = user;

      return {
        data: result,
        error: null,
      };

    } catch (error) {
      console.error('Erro durante validação do usuário:', error);

      return {
        data: null,
        error: {
          message: 'Erro interno durante a validação',
          error: 'VALIDATION_ERROR',
        }
      };
    }
  }
}
