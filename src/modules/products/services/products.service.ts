import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/database/entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async find(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async create(product: CreateProductDto): Promise<Product> {
    const productEntity = this.productRepository.create(product);
    return await this.productRepository.save(productEntity);
  }

  async delete(id: number): Promise<string> {
    await this.productRepository.delete({ id });
    return `Delete product with id: ${id} successfully`;
  }

  async update(id: number, product: UpdateProductDto): Promise<Product> {
    await this.productRepository.update({ id }, product);
    return await this.productRepository.findOneBy({ id });
  }
}
