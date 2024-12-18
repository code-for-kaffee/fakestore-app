import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class Products {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('float')
  price: number;

  @Column()
  description: string;

  @Column()
  category: string;

  @Column()
  image: string;

  @Column()
  stock: number;
}
