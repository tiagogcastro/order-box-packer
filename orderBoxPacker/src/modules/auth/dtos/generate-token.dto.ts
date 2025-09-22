import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class GenerateTokenRequestDto {
  @ApiProperty({
    description: 'Nome de usuário para login',
    example: 'admin',
    minLength: 3,
    maxLength: 50,
  })
  @IsString()
  @IsNotEmpty({ message: 'Username é obrigatório' })
  @MinLength(3, { message: 'Username deve ter pelo menos 3 caracteres' })
  @MaxLength(50, { message: 'Username deve ter no máximo 50 caracteres' })
  username: string;

  @ApiProperty({
    description: 'Senha do usuário',
    example: 'admin123',
    minLength: 6,
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty({ message: 'Password é obrigatório' })
  @MinLength(6, { message: 'Password deve ter pelo menos 6 caracteres' })
  @MaxLength(100, { message: 'Password deve ter no máximo 100 caracteres' })
  password: string;
}

export class UserInfoDto {
  @ApiProperty({
    description: 'ID único do usuário',
    example: "ca229cd3-94aa-4ecc-8d76-bdbc788db20d",
  })
  id: number;

  @ApiProperty({
    description: 'Nome de usuário',
    example: 'admin',
  })
  username: string;
}

export class GenerateTokenResponseDto {
  @ApiProperty({
    description: 'Token de acesso JWT',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  access_token: string;

  @ApiProperty({
    description: 'Tipo do token',
    example: 'Bearer',
  })
  token_type: string;

  @ApiProperty({
    description: 'Tempo de expiração do token',
    example: '24h',
  })
  expires_in: string;

  @ApiProperty({
    description: 'Informações do usuário autenticado',
    type: UserInfoDto,
  })
  user: UserInfoDto;
}
