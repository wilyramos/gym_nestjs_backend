
import { IsNumber, IsEnum, IsOptional } from 'class-validator';

export class CreatePaymentDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  membershipId: number;

  @IsNumber()
  amount: number;

  @IsEnum(['EFECTIVO', 'TARJETA', 'TRANSFERENCIA'])
  method: 'EFECTIVO' | 'TARJETA' | 'TRANSFERENCIA';

  @IsOptional()
  notes?: string;
}