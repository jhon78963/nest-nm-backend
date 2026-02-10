import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'Puede ser el username o el email',
    example: 'admin',
  })
  @IsString()
  @IsNotEmpty()
  identifier: string;

  @ApiProperty({ example: '123qwe123' })
  @MinLength(8)
  password: string;
}
