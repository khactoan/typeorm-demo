import { Exclude, Expose } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Product } from './product.entity';
import { UserRole } from 'src/modules/users/const/user';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  email: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.BUYER,
  })
  role: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  fullName: string;

  @Column()
  favoriteTheme: string;

  @Expose()
  get greeting(): string {
    return `Hello guys, my name is ${this.fullName}`;
  }

  @OneToMany(() => Product, (product) => product.user)
  products: Product[];
}
