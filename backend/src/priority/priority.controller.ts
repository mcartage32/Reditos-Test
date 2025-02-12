import { Controller, Get, UseGuards } from '@nestjs/common';
import { PriorityService } from './priority.service';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('priorities')
@ApiBearerAuth()
@Controller('priorities')
@UseGuards(AuthGuard('jwt'))
export class PriorityController {
  constructor(private readonly priorityService: PriorityService) {}

  @ApiOperation({ summary: 'Obtener todas las prioridades' })
  @ApiResponse({
    status: 200,
    description: 'Lista de prioridades obtenida correctamente',
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado, requiere token JWT',
  })
  @Get()
  async findAll() {
    return this.priorityService.findAll();
  }
}
