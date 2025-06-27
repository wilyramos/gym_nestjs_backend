import { Type } from "class-transformer";
import { IsDateString, IsEnum, IsNumberString, IsOptional, Min } from "class-validator";

export class getPaymentsQueryDto {
    @IsOptional()
    @IsNumberString()
    userId?: string;

    @IsOptional()
    @IsEnum(['EFECTIVO', 'TARJETA', 'TRANSFERENCIA', 'YAPE'])
    method?: 'EFECTIVO' | 'TARJETA' | 'TRANSFERENCIA' | 'YAPE';

    @IsOptional()
    @IsDateString()
    startDate?: string;

    @IsOptional()
    @IsDateString()
    endDate?: string;

    @IsOptional()
    @Type(() => Number)
    @Min(1)
    page?: number;

    @IsOptional()
    @Type(() => Number)
    @Min(1)
    limit?: number;
}