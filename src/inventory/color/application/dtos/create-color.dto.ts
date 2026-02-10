import { ApiProperty } from '@nestjs/swagger';
import { IsHexColor, IsNotEmpty, IsString } from 'class-validator';

export class CreateColorDto {
  @ApiProperty({ example: 'Azul Noche' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '#000080', description: 'Código Hexadecimal válido' })
  @IsHexColor()
  hexCode: string;
}
