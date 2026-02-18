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
  GetSizeTypesUseCase,
  GetSizeTypeUseCase,
} from '../../application/use-cases';
import { SizeType } from '../../domain/entities';

@ApiTags('Inventory - Size Types')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('inventory/size-types')
export class SizeTypeController {
  constructor(
    private readonly getSizesTypesUseCase: GetSizeTypesUseCase,
    private readonly getSizeTypeUseCase: GetSizeTypeUseCase,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, type: [SizeType] })
  @ApiOperation({ summary: 'Listar todos los tipos de tamaños' })
  async findAll(): Promise<SizeType[]> {
    return await this.getSizesTypesUseCase.execute();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, type: SizeType })
  @ApiResponse({ status: 404, description: 'Tipo de tamaño no encontrado.' })
  @ApiOperation({ summary: 'Obtener un tipo de tamaño por ID' })
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<SizeType> {
    return await this.getSizeTypeUseCase.execute(id);
  }
}
