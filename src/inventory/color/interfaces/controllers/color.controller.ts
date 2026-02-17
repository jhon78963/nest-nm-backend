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
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/infrastructure/guards/jwt-auth.guard';
import { CreateColorDto } from '../../application/dtos/create-color.dto';
import { UpdateColorDto } from '../../application/dtos/update-color.dto';
import { CreateColorUseCase } from '../../application/use-cases/create-color.use-case';
import { DeleteColorUseCase } from '../../application/use-cases/delete-color.use-case';
import { GetColorUseCase } from '../../application/use-cases/get-color.use-case';
import { GetColorsUseCase } from '../../application/use-cases/get-colors.use-case';
import { UpdateColorUseCase } from '../../application/use-cases/update-color.use-case';
import { Color } from '../../domain/entities/color.entity';
import { DEFAULT_LIMIT, DEFAULT_PAGE, PaginatedResult } from 'src/shared/interfaces';

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

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, type: [Color] })
  @ApiOperation({ summary: 'Listar todos los colores' })
  async findAll(
    @Query('page') page: number = DEFAULT_PAGE,
    @Query('limit') limit: number = DEFAULT_LIMIT, 
  ): Promise<PaginatedResult<Color[]>> {
    const pageNumber = Math.max(1, Number(page));
    const limitNumber = Math.max(1, Number(limit));
    return await this.getColorsUseCase.execute({ page: pageNumber, limit: limitNumber });
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, type: Color })
  @ApiResponse({ status: 404, description: 'Color no encontrado.' })
  @ApiOperation({ summary: 'Obtener un color por ID' })
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Color> {
    return await this.getColorUseCase.execute(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: 201, type: Color })
  @ApiOperation({
    summary: 'Registrar nuevo color',
  })
  async create(
    @Body() dto: CreateColorDto,
    @Request() req: any,
  ): Promise<Color> {
    const userId = req.user.id;
    return await this.createColorUseCase.execute(dto, userId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un color parcialmente' })
  @ApiResponse({ status: 200, description: 'Color actualizado exitosamente.' })
  @ApiResponse({ status: 404, description: 'Color no encontrado.' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateColorDto: UpdateColorDto,
    @Request() req: any,
  ) {
    const userId = req.user.id;
    return this.updateColorUseCase.execute(id, updateColorDto, userId);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Eliminar un color' })
  @ApiResponse({ status: 200, description: 'Color eliminado exitosamente.' })
  @ApiResponse({ status: 404, description: 'Color no encontrado.' })
  async delete(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() req: any,
  ): Promise<void> {
    const userId = req.user.id;
    await this.deleteColorUseCase.execute(id, userId);
  }
}
