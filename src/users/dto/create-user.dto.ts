import { IsString, IsEmail, MinLength, IsOptional, IsNumberString, Length } from 'class-validator';

export class CreateUserDto {
    @IsString() // Decorator to validate that the value is a string
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    password: string;

    @IsNumberString()
    @Length(8, 8, { message: 'DNI must be exactly 8 digits' })
    dni?: string;

    @IsOptional()
    @IsString()
    role?: 'CLIENT' | 'TRAINER' | 'ADMIN';

    @IsOptional()
    @IsString()
    phone?: string;
}
