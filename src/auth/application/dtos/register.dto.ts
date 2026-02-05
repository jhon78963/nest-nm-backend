import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'jdoe' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'juan@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Juan' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Perez' })
  @IsString()
  @IsNotEmpty()
  surname: string;

  @ApiProperty({ example: 'secret123' })
  @MinLength(8)
  password: string;
}
