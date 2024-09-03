import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/database/entities/product.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { User } from 'src/database/entities/user.entity';
import * as fs from 'fs';
import * as path from 'path';
import { ProductImage } from 'src/database/entities/product-image.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private dataSource: DataSource,
  ) {}

  async find(): Promise<Product[]> {
    return await this.productRepository.find({
      relations: { user: true },
    });
  }

  async create(
    product: CreateProductDto,
    user: User,
    files: Array<Express.Multer.File>,
  ): Promise<Product> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    let newProduct;

    try {
      newProduct = await queryRunner.manager.save(Product, {
        ...product,
        userId: user.id,
      });

      const productDir = path.join('public/products', newProduct.id.toString());

      // Ensure the directory exists
      if (!fs.existsSync(productDir)) {
        fs.mkdirSync(productDir, { recursive: true });
      }

      const productImages = files.map((file) => {
        const filePath = path.join(productDir, file.originalname);
        fs.writeFileSync(filePath, file.buffer);

        return {
          productId: newProduct.id,
          imageUrl: `${process.env.HOST}/products/${newProduct.id.toString()}/${file.originalname}`,
        };
      });

      const newProductImages = await queryRunner.manager.save(
        ProductImage,
        productImages,
      );

      newProduct.images = newProductImages;
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }

    return newProduct;
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
