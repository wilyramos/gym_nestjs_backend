import { Controller, Query } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { Body, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { GetExercisesQueryDto } from './dto/get-exercises-query.dto';


@Controller('exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) { }


  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Post()
  create(@Body() dto: CreateExerciseDto) {
    return this.exercisesService.create(dto);
  }

  @Get()
  findAll(@Query() query: GetExercisesQueryDto) {
    console.log('Query:', query);
    return this.exercisesService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.exercisesService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: Partial<CreateExerciseDto>) {
    return this.exercisesService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.exercisesService.remove(+id);
  }
}