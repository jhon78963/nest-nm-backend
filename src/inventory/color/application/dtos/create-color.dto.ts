import { IsString, IsNotEmpty, IsHexColor } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateColorDto {
  @ApiProperty({ example: 'Azul Noche' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '#000080', description: 'Código Hexadecimal válido' })
  @IsHexColor()
  hexCode: string;
}
