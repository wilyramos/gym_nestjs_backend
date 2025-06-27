import { Type } from "class-transformer";
import { IsNotEmpty, IsOptional, IsArray, ValidateNested } from "class-validator";


export class RoutineExerciseDto {
    @IsNotEmpty()
    exerciseId: number;

    @IsNotEmpty()
    reps: number;

    @IsNotEmpty()
    sets: number;

    @IsOptional()
    day?: string;
}

export class CreateRoutineDto {
    @IsNotEmpty()
    name: string;

    @IsOptional()
    description?: string;

    @IsNotEmpty()
    userId: number;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => RoutineExerciseDto)
    exercises: RoutineExerciseDto[];
}