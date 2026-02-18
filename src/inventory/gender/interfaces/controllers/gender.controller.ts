import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/infrastructure/guards/jwt-auth.guard';
import {
  GetGendersUseCase,
  GetGenderUseCase,
} from '../../application/use-cases';
import { Gender } from '../../domain/entities/gender.entity';

@ApiTags('Inventory - Genders')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('inventory/genders')
export class GenderController {
  constructor(
    private readonly getGendersUseCase: GetGendersUseCase,
    private readonly getGenderUseCase: GetGenderUseCase,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, type: [Gender] })
  @ApiOperation({ summary: 'Listar todos los géneros' })
  async findAll(): Promise<Gender[]> {
    return await this.getGendersUseCase.execute();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, type: Gender })
  @ApiResponse({ status: 404, description: 'Género no encontrado.' })
  @ApiOperation({ summary: 'Obtener un género por ID' })
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Gender> {
    return await this.getGenderUseCase.execute(id);
  }
}
