import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GenerateTokenRequestDto, GenerateTokenResponseDto } from '../dtos/generate-token.dto';
import { GenerateTokenUseCase } from '../usecases/generate-token.usecase';

@ApiTags('Autenticação')
@Controller('auth')
export class AuthController {
  constructor(private readonly generateTokenUseCase: GenerateTokenUseCase) { }

  @Post('login')
  @ApiOperation({
    summary: 'Fazer login',
    description: 'Autentica o usuário e retorna um token JWT que deve ser usado nas rotas protegidas'
  })
  @ApiResponse({
    status: 201,
    description: 'Lista de pedidos realizados',
    type: GenerateTokenResponseDto
  })
  @ApiResponse({
    status: 401,
    description: 'Credenciais inválidas',
    example: {
      success: false,
      error: 'Erro na geração do token'
    }
  })
  async login(@Body() data: GenerateTokenRequestDto) {
    return this.generateTokenUseCase.execute(data);
  }
}
