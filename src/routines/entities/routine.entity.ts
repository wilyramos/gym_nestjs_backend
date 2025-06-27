import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RoutineExercise } from "./routine-exercise.entity";

@Entity()
export class Routine {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    description?: string;

    @ManyToOne(() => User, (user) => user.routines)
    user: User;

    @OneToMany(() => RoutineExercise, (re) => re.routine, { cascade: true })
    exercises: RoutineExercise[];
}
