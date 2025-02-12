import { Controller, Get, UseGuards } from '@nestjs/common';
import { StatusService } from './status.service';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('statuses')
@ApiBearerAuth()
@Controller('statuses')
@UseGuards(AuthGuard('jwt'))
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @ApiOperation({ summary: 'Obtener todos los estados' })
  @ApiResponse({
    status: 200,
    description: 'Lista de estados obtenida correctamente',
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado, requiere token JWT',
  })
  @Get()
  async findAll() {
    return this.statusService.findAll();
  }
}
