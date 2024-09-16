import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ProductImageDto } from './product-image.dto';

export class ProductDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty({
    minimum: 0,
  })
  quantity: number;

  @ApiPropertyOptional({
    minimum: 0,
  })
  quantitySold: number;

  @ApiProperty({
    minimum: 0,
  })
  price: number;

  @ApiPropertyOptional({ type: ProductImageDto, isArray: true })
  productImages: ProductImageDto[];
}
