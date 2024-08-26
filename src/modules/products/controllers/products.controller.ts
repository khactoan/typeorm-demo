import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { ProductsService } from '../services/products.service';
import { UpdateProductDto } from '../dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  async find() {
    return await this.productsService.find();
  }

  @Post()
  async create(@Body() product: CreateProductDto) {
    console.log(product);
    return await this.productsService.create(product);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() product: UpdateProductDto,
  ) {
    return await this.productsService.update(id, product);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    console.log(id);
    return await this.productsService.delete(id);
  }
}
