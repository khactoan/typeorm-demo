import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  @IsPositive()
  quantity: number;

  @IsNumber()
  quantitySold: number;

  @IsNumber()
  @IsPositive()
  price: number;
}
