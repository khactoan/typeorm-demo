import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseFilePipeBuilder,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { ProductsService } from '../services/products.service';
import { UpdateProductDto } from '../dto/update-product.dto';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/modules/users/decorators/roles.decorator';
import { CurrentUser } from 'src/modules/users/decorators/current-user.decorator';
import { User } from 'src/database/entities/user.entity';
import { FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiCreatedResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ProductDto } from '../dto/product.dto';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PaginationMetaDto } from 'src/shared/dto/pagination-meta.dto';
import { PageDto } from 'src/shared/dto/page.dto';

@Controller('products')
@ApiTags('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  async find(@Query() paginationDto: PaginationDto) {
    const { items, totalItem } = await this.productsService.find(paginationDto);

    return new PageDto(
      items,
      new PaginationMetaDto({ paginationDto, totalItem }),
    );
  }

  @UseGuards(RolesGuard)
  @Roles(['ADMIN'])
  @UseInterceptors(FilesInterceptor('files', 3))
  @ApiCreatedResponse({
    type: ProductDto,
    description: 'Create a product with image upload',
  })
  @ApiUnauthorizedResponse({
    description: 'You are not allowed to create a product',
  })
  @Post()
  async create(
    @Body() product: CreateProductDto,
    @CurrentUser() currentUser: User,
    @UploadedFiles(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /^image\/(jpg|jpeg|png)$/,
        })
        .addMaxSizeValidator({
          maxSize: 10_000_000,
        })
        .build(),
    )
    files: Array<Express.Multer.File>,
  ) {
    return await this.productsService.create(product, currentUser, files);
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
    return await this.productsService.delete(id);
  }
}
