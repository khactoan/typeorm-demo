import { ApiProperty } from '@nestjs/swagger';

export class ProductImageDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  imageUrl: string;

  @ApiProperty()
  productId: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
