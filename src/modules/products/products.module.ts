import { Module } from '@nestjs/common';
import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/database/entities/product.entity';
import { ProductImage } from 'src/database/entities/product-image.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductImage]), UsersModule],
  providers: [ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule {}
