import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { RoutineExercise } from '../../routines/entities/routine-exercise.entity';


@Entity()
export class Exercise {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  muscleGroup: string;

  // @OneToMany(() => RoutineExercise, (re) => re.exercise)
  // routineEntries: RoutineExercise[];
}
