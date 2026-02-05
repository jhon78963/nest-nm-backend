import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { LoginUseCase } from '../../application/use-cases/login.use-case';
import { LoginDto } from '../../application/dtos/login.dto';
import { AuthResponseDto } from '../../application/dtos/auth-response.dto';
import { RegisterDto } from 'src/auth/application/dtos/register.dto';
import { RegisterUseCase } from 'src/auth/application/use-cases/register.use-case';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly registerUseCase: RegisterUseCase,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, type: AuthResponseDto })
  @ApiOperation({
    summary: 'Iniciar sesión',
  })
  async login(@Body() dto: LoginDto): Promise<AuthResponseDto> {
    return this.loginUseCase.execute(dto);
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
