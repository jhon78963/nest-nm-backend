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

import { CreateSizeDto, UpdateSizeDto } from '../../application/dtos';
import {
  CreateSizeUseCase,
  DeleteSizeUseCase,
  GetSizesUseCase,
  GetSizeUseCase,
  UpdateSizeUseCase,
} from '../../application/use-cases';
import { Size } from '../../domain/entities';

@ApiTags('Inventory - Sizes')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('inventory/sizes')
export class SizeController {
  constructor(
    private readonly createSizeUseCase: CreateSizeUseCase,
    private readonly deleteSizeUseCase: DeleteSizeUseCase,
    private readonly getSizesUseCase: GetSizesUseCase,
    private readonly getSizeUseCase: GetSizeUseCase,
    private readonly updateSizeUseCase: UpdateSizeUseCase,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, type: [Size] })
  @ApiOperation({ summary: 'Listar todas las tallas' })
  async findAll(): Promise<Size[]> {
    return await this.getSizesUseCase.execute();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, type: Size })
  @ApiResponse({ status: 404, description: 'Talla no encontrada.' })
  @ApiOperation({ summary: 'Obtener una talla por ID' })
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Size> {
    return await this.getSizeUseCase.execute(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: 201, type: Size })
  @ApiOperation({
    summary: 'Registrar nueva talla',
  })
  async create(@Body() dto: CreateSizeDto, @Request() req: any): Promise<Size> {
    const userId = req.user.id;
    return await this.createSizeUseCase.execute(dto, userId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una talla parcialmente' })
  @ApiResponse({ status: 200, description: 'Talla actualizada exitosamente.' })
  @ApiResponse({ status: 404, description: 'Talla no encontrada.' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateSizeDto: UpdateSizeDto,
    @Request() req: any,
  ) {
    const userId = req.user.id;
    return this.updateSizeUseCase.execute(id, updateSizeDto, userId);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Eliminar una talla' })
  @ApiResponse({ status: 200, description: 'Talla eliminada exitosamente.' })
  @ApiResponse({ status: 404, description: 'Talla no encontrada.' })
  async delete(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() req: any,
  ): Promise<void> {
    const userId = req.user.id;
    await this.deleteSizeUseCase.execute(id, userId);
  }
}
