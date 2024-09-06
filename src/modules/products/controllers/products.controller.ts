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
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/modules/users/decorators/roles.decorator';
import { CurrentUser } from 'src/modules/users/decorators/current-user.decorator';
import { User } from 'src/database/entities/user.entity';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  async find() {
    return await this.productsService.find();
  }

  @UseGuards(RolesGuard)
  @Roles(['ADMIN'])
  @Post()
  async create(
    @Body() product: CreateProductDto,
    @CurrentUser() currentUser: User,
  ) {
    return await this.productsService.create(product, currentUser);
  }

  @UseGuards(RolesGuard)
  @Roles(['ADMIN'])
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() product: UpdateProductDto,
  ) {
    return await this.productsService.update(id, product);
  }

  @UseGuards(RolesGuard)
  @Roles(['ADMIN'])
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    console.log(id);
    return await this.productsService.delete(id);
  }
}
