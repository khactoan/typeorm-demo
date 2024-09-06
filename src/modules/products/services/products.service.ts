import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/database/entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { User } from 'src/database/entities/user.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async find(): Promise<Product[]> {
    return await this.productRepository.find({
      relations: { user: true },
    });
  }

  async create(product: CreateProductDto, user: User): Promise<Product> {
    return await this.productRepository.save({
      ...product,
      userId: user.id,
    });
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
