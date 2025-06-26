import { IsOptional, IsString, IsNumberString } from 'class-validator';


export class GetUsersQueryDto {
    
    @IsOptional()
    @IsString()
    query?: string;

    @IsOptional()
    @IsNumberString()
    page?: number;

    @IsOptional()
    @IsNumberString()
    limit?: number;

}