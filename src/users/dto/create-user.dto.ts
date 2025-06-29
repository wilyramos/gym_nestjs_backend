import { IsString, IsEmail, MinLength, IsOptional, IsNumberString, Length, IsNumber, IsDateString } from 'class-validator';

export class CreateUserDto {
    @IsString() // Decorator to validate that the value is a string
    name: string;

    @IsEmail()
    email: string;

    @IsOptional()
    @IsString()
    @MinLength(6)
    password?: string;

    @IsNumberString()
    @Length(8, 8, { message: 'DNI must be exactly 8 digits' })
    dni?: string;

    @IsOptional()
    @IsString()
    role?: 'CLIENT' | 'TRAINER' | 'ADMIN';

    @IsOptional()
    @IsString()
    phone?: string;

    @IsOptional()
    @IsNumber()
    membershipId?: number; // Optional, to link to a membership if needed

    @IsOptional()
    @IsDateString()
    membershipStartDate?: Date; // Optional, to set the start date of the membership

    @IsOptional()
    @IsDateString()
    membershipEndDate?: Date; // Optional, to set the end date of the membership
}
