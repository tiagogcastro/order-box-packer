import { GenerateTokenRequestDto, GenerateTokenResponseDto } from '@/modules/auth/dtos/generate-token.dto';
import { AuthService } from '@/modules/auth/services/auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Autenticação')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  @ApiOperation({
    summary: 'Fazer login',
    description: 'Autentica o usuário e retorna um token JWT que deve ser usado nas rotas protegidas'
  })
  @ApiResponse({
    status: 201,
    description: 'Token de autenticação gerado com sucesso',
    type: GenerateTokenResponseDto
  })
  @ApiResponse({
    status: 401,
    description: 'Credenciais inválidas',
    example: {
      data: null,
      error: {
        message: 'Erro na geração do token',
        error: 'ERROR_TYPE'
      }
    }
  })
  async login(@Body() data: GenerateTokenRequestDto) {
    return this.authService.generateToken(data.username, data.password);
  }
}
