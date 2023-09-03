import { IsString, IsOptional } from 'class-validator';

export class FindAllCarDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  brand?: string;

  @IsOptional()
  @IsString()
  price_from?: number;

  @IsOptional()
  @IsString()
  price_to?: number;

  @IsOptional()
  @IsString()
  sort?: string;

  @IsOptional()
  @IsString()
  limit?: number;
}
