import { Exclude, Expose } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @Column()
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

  // @OneToMany(() => Product, (product) => product.user)
  // products: Product[];
}
