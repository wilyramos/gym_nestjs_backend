import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { UpdateRoutineDto } from './dto/update-routine.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Routine } from './entities/routine.entity';
import { RoutineExercise } from './entities/routine-exercise.entity';
import { Exercise } from '../exercises/entities/exercise.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class RoutinesService {

  constructor(
    @InjectRepository(Routine)
    private routineRepository: Repository<Routine>,
    @InjectRepository(RoutineExercise)
    private routineExerciseRepository: Repository<RoutineExercise>,
    @InjectRepository(Exercise)
    private exerciseRepository: Repository<Exercise>,
    private usersService: UsersService,
  ) { }

  async create(createRoutineDto: CreateRoutineDto) {
    const { name, description, exercises, userId } = createRoutineDto;

    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${userId} no encontrado`);
    }

    if (!exercises || exercises.length === 0) {
      throw new NotFoundException('Debe incluir al menos un ejercicio');
    }

    const exerciseIds = exercises.map(e => e.exerciseId);
    const foundExercises = await this.exerciseRepository.findByIds(exerciseIds);

    if (foundExercises.length !== exerciseIds.length) {
      throw new NotFoundException('Uno o más ejercicios no existen');
    }

    const exerciseMap = new Map(foundExercises.map(exercise => [exercise.id, exercise]));

    const routine = this.routineRepository.create({
      name,
      description,
      user,
      exercises: exercises.map((exerciseDto) =>
        this.routineExerciseRepository.create({
          exercise: exerciseMap.get(exerciseDto.exerciseId),
          sets: exerciseDto.sets,
          reps: exerciseDto.reps,
          day: exerciseDto.day,
        }),
      ),
    });

    await this.routineRepository.save(routine);
    return {
      message: 'Rutina creada exitosamente',
      routine,
    };
  }


  findAll() {
    return `This action returns all routines`;
  }

  findOne(id: number) {
    return `This action returns a #${id} routine`;
  }

  update(id: number, updateRoutineDto: UpdateRoutineDto) {
    return `This action updates a #${id} routine`;
  }

  remove(id: number) {
    return `This action removes a #${id} routine`;
  }
}