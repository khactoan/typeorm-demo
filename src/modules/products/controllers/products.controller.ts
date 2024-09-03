import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { ProductsService } from '../services/products.service';
import { UpdateProductDto } from '../dto/update-product.dto';
import { CurrentUser } from 'src/modules/users/decorators/current-user.decorator';
import { User } from 'src/database/entities/user.entity';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/modules/users/decorators/roles.decorator';
import { FormDataRequest } from 'nestjs-form-data';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  async find() {
    return await this.productsService.find();
  }

  @UseGuards(RolesGuard)
  @Roles(['ADMIN'])
  @FormDataRequest()
  @Post()
  async create(@Body() product: CreateProductDto, @CurrentUser() user: User) {
    return await this.productsService.create(product, user);
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
