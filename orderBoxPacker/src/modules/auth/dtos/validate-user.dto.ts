import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class ValidateUserRequestDto {
  @ApiProperty({
    description: 'Nome de usuário para autenticação',
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

export class ValidateUserResponseDto {
  @ApiProperty({
    description: 'ID único do usuário',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Nome de usuário',
    example: 'admin',
  })
  username: string;

  @ApiProperty({
    description: 'Data de criação do usuário',
    example: '2025-09-20T18:33:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Data da última atualização',
    example: '2025-09-20T18:33:00.000Z',
  })
  updatedAt: Date;
}
