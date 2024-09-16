import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ProductImageDto } from './product-image.dto';

export class ProductDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  quantity: number;

  @ApiPropertyOptional()
  quantitySold: number;

  @ApiProperty()
  price: number;

  @ApiProperty({ type: ProductImageDto, isArray: true })
  productImages: ProductImageDto[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
