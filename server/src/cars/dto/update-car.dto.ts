import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateCarDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  brand?: string;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  manufacture?: number;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  price?: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  currency?: string;
}
