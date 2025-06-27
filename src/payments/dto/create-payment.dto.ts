
import { IsNumber, IsEnum, IsOptional } from 'class-validator';

export class CreatePaymentDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  membershipId: number;

  @IsNumber()
  amount: number;

  @IsEnum(['EFECTIVO', 'TARJETA', 'TRANSFERENCIA', 'YAPE'])
  method: 'EFECTIVO' | 'TARJETA' | 'TRANSFERENCIA' | 'YAPE';

  @IsOptional()
  notes?: string;
}