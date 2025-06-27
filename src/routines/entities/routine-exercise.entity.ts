// src/routines/entities/routine-exercise.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Routine } from './routine.entity';
import { Exercise } from 'src/exercises/entities/exercise.entity';

@Entity()
export class RoutineExercise {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Routine, (routine) => routine.exercises, { onDelete: 'CASCADE' })
    routine: Routine;

    @ManyToOne(() => Exercise)
    exercise: Exercise;

    @Column()
    sets: number;

    @Column()
    reps: number;

    @Column({ nullable: true })
    day: string; // ej: 'Lunes', 'Martes'
}
