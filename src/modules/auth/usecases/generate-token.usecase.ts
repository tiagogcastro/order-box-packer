import {
  GenerateTokenRequestDto
} from '@/modules/auth/dtos/generate-token.dto';
import { ValidateUserUseCase } from '@/modules/auth/usecases/validate-user.usecase';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class GenerateTokenUseCase {
  constructor(
    private readonly validateUserUseCase: ValidateUserUseCase,
    private readonly jwtService: JwtService,
  ) { }

  async execute(request: GenerateTokenRequestDto) {
    try {
      const { username, password } = request;

      const userValidation = await this.validateUserUseCase.execute({ username, password });

      if (userValidation.error) {
        return {
          data: null,
          error: userValidation.error
        };
      }

      const user = userValidation.data!;

      const payload = {
        sub: user.id,
        username: user.username,
        iat: Math.floor(Date.now() / 1000),
      };

      const token = this.jwtService.sign(payload);

      return {
        data: {
          access_token: token,
          token_type: 'Bearer',
          expires_in: '24h',
          user: {
            id: user.id,
            username: user.username,
          },
        },
        error: null,
      };

    } catch (error) {
      console.error('Erro durante geração do token:', error);

      return {
        data: null,
        error: {
          message: 'Erro interno durante a geração do token',
          error: 'TOKEN_GENERATION_ERROR',
        }
      };
    }
  }
}
