import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/database/entities/product.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { User } from 'src/database/entities/user.entity';
import * as path from 'path';
import * as fs from 'fs';
import { ProductImage } from 'src/database/entities/product-image.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(ProductImage)
    private productImageRepository: Repository<ProductImage>,
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
    files: Express.Multer.File[],
  ): Promise<Product> {
    let newProduct;

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      newProduct = await queryRunner.manager.save(Product, {
        ...product,
        userId: user.id,
      });

      const subFolderDir = `products/${newProduct.id.toString()}`;
      const folderDir = path.join('public', subFolderDir);

      if (!fs.existsSync(folderDir)) {
        fs.mkdirSync(folderDir, { recursive: true });
      }

      const productImages = files.map((file) => {
        const filePath = `${folderDir}/${file.originalname}`;
        fs.writeFileSync(filePath, file.buffer);

        return {
          imageUrl: `${process.env.HOST}/${subFolderDir}/${file.originalname}`,
          productId: newProduct.id,
        };
      });

      const newProductImages = await queryRunner.manager.save(
        ProductImage,
        productImages,
      );

      newProduct.productImages = newProductImages;
      await queryRunner.commitTransaction();
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      // you need to release a queryRunner which was manually instantiated
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
