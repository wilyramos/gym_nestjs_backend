import { forwardRef, Module } from '@nestjs/common';
import { RoutinesService } from './routines.service';
import { RoutinesController } from './routines.controller';
import { Exercise } from 'src/exercises/entities/exercise.entity';
import { RoutineExercise } from './entities/routine-exercise.entity';
import { Routine } from './entities/routine.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Routine, RoutineExercise, Exercise]),
    forwardRef(() => UsersModule), // Forward reference to UsersModule
  ],
  controllers: [RoutinesController],
  providers: [RoutinesService],
})
export class RoutinesModule {}
