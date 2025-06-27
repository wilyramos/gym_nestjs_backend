import { IsOptional, IsString, IsNumberString } from 'class-validator';

export class GetExercisesQueryDto {
    @IsOptional()
    @IsString()
    search?: string; // Buscar por nombre o descripción

    @IsOptional()
    @IsString()
    muscleGroup?: string; // Filtrar por grupo muscular

    @IsOptional()
    @IsNumberString()
    page?: string;

    @IsOptional()
    @IsNumberString()
    limit?: string;
}
