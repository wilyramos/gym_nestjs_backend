import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoutinesService } from './routines.service';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { UpdateRoutineDto } from './dto/update-routine.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('routines')
export class RoutinesController {
  constructor(private readonly routinesService: RoutinesService) {}


  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN') // Adjust roles as needed
  @Post()
  create(@Body() createRoutineDto: CreateRoutineDto) {
    return this.routinesService.create(createRoutineDto);
  }

  @Get()
  findAll() {
    return this.routinesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.routinesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoutineDto: UpdateRoutineDto) {
    return this.routinesService.update(+id, updateRoutineDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.routinesService.remove(+id);
  }
}
