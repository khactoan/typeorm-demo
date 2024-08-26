import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  quantity: number;

  @Column()
  quantitySold: number;

  @Column()
  price: number;

  @Column()
  userId: number;

  // @ManyToOne(() => User, (user) => user.products)
  // @JoinColumn({ referencedColumnName: 'userId' })
  // user: User;
}
