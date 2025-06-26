// get-users-query.dto.ts

import { IsOptional, IsString, IsNumberString } from 'class-validator';

export class GetUsersQueryDto {
  @IsOptional()
  @IsString()
  query?: string;

  @IsOptional()
  @IsNumberString()
  page?: string;

  @IsOptional()
  @IsNumberString()
  limit?: string;
}
