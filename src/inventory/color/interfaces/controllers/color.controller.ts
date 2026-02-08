import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/infrastructure/guards/jwt-auth.guard';
import { CreateColorUseCase } from '../../application/use-cases/create-color.use-case';
import { GetColorsUseCase } from '../../application/use-cases/get-colors.use-case';
import { DeleteColorUseCase } from '../../application/use-cases/delete-color.use-case';
import { UpdateColorUseCase } from '../../application/use-cases/update-color.use-case';
import { CreateColorDto } from '../../application/dtos/create-color.dto';
import { Color } from '../../domain/entities/color.entity';
import { UpdateColorDto } from '../../application/dtos/update-color.dto';
import { GetColorUseCase } from '../../application/use-cases/get-color.use-case';

@ApiTags('Inventory - Colors')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('inventory/colors')
export class ColorController {
  constructor(
    private readonly createColorUseCase: CreateColorUseCase,
    private readonly deleteColorUseCase: DeleteColorUseCase,
    private readonly getColorsUseCase: GetColorsUseCase,
    private readonly getColorUseCase: GetColorUseCase,
    private readonly updateColorUseCase: UpdateColorUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: 201, type: Color })
  @ApiOperation({
    summary: 'Registrar nuevo color',
  })
  async create(@Body() dto: CreateColorDto): Promise<Color> {
    return await this.createColorUseCase.execute(dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Eliminar un color' })
  @ApiResponse({ status: 200, description: 'Color eliminado exitosamente.' })
  @ApiResponse({ status: 404, description: 'Color no encontrado.' })
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.deleteColorUseCase.execute(id);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, type: [Color] })
  @ApiOperation({ summary: 'Listar todos los colores' })
  async findAll(): Promise<Color[]> {
    return await this.getColorsUseCase.execute();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, type: Color })
  @ApiResponse({ status: 404, description: 'Color no encontrado.' })
  @ApiOperation({ summary: 'Obtener un color por ID' })
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Color> {
    return await this.getColorUseCase.execute(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un color parcialmente' })
  @ApiResponse({ status: 200, description: 'Color actualizado exitosamente.' })
  @ApiResponse({ status: 404, description: 'Color no encontrado.' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateColorDto: UpdateColorDto,
  ) {
    return this.updateColorUseCase.execute(id, updateColorDto);
  }
}
