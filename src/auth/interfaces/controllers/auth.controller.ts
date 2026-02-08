import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { GetProfileUseCase } from 'src/auth/application/use-cases/get-profile.use-case';
import { LoginUseCase } from '../../application/use-cases/login.use-case';
import { LogoutUseCase } from 'src/auth/application/use-cases/logout.use-case';
import { RefreshTokenUseCase } from 'src/auth/application/use-cases/refresh-token.use-case';
import { RegisterUseCase } from 'src/auth/application/use-cases/register.use-case';

import { LoginDto } from '../../application/dtos/login.dto';
import { RegisterDto } from 'src/auth/application/dtos/register.dto';
import { AuthResponseDto } from '../../application/dtos/auth-response.dto';
import { ProfileResponseDto } from 'src/auth/application/dtos/profile-response.dto';

import { GetCurrentUser } from '../decorators/get-current-user.decorator';

import { JwtAuthGuard } from 'src/auth/infrastructure/guards/jwt-auth.guard';
import { RefreshTokenGuard } from 'src/auth/infrastructure/guards/refresh-token.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly getProfileUseCase: GetProfileUseCase,
    private readonly loginUseCase: LoginUseCase,
    private readonly logoutUseCase: LogoutUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
    private readonly registerUseCase: RegisterUseCase,
  ) {}

  @Post('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener perfil del usuario logueado' })
  @ApiResponse({ status: 200, type: ProfileResponseDto })
  async getProfile(
    @GetCurrentUser('id') userId: string,
  ): Promise<ProfileResponseDto> {
    return this.getProfileUseCase.execute(userId);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, type: AuthResponseDto })
  @ApiOperation({
    summary: 'Iniciar sesión',
  })
  async login(@Body() dto: LoginDto): Promise<AuthResponseDto> {
    return this.loginUseCase.execute(dto);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cerrar sesión (Invalidar Refresh Token)' })
  async logout(@GetCurrentUser('id') userId: string) {
    await this.logoutUseCase.execute(userId);
    return { message: 'Sesión cerrada correctamente' };
  }

  @Post('refresh-token')
  @UseGuards(RefreshTokenGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Refrescar tokens usando el Refresh Token' })
  async refreshTokens(
    @GetCurrentUser('id') userId: string,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ) {
    return this.refreshTokenUseCase.execute(userId, refreshToken);
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: 201, type: AuthResponseDto })
  @ApiOperation({
    summary: 'Registrar nuevo usuario',
  })
  async register(@Body() dto: RegisterDto): Promise<AuthResponseDto> {
    return this.registerUseCase.execute(dto);
  }
}
