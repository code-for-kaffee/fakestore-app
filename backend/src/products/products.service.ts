import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Products } from 'src/database/entity/product.entity';
import { CreateProductDto } from './dtos/product.dto';

@Injectable()
export class ProductsService {
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
  ) {}

  async getAllProductsFromFakeStoreApi(): Promise<any> {
    try {
      const url = 'https://fakestoreapi.com/products';
      const response = await lastValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch products from Fake Store API');
    }
  }

  async seedDatabase(): Promise<string> {
    try {
      const products = await this.getAllProductsFromFakeStoreApi();
      const entities = products.map((product) =>
        this.productsRepository.create({
          title: product.title,
          price: product.price,
          description: product.description,
          category: product.category,
          image: product.image,
          stock: Math.floor(Math.random() * 100),
        }),
      );
      await this.productsRepository.save(entities);
      return 'Database seeded successfully';
    } catch (error) {
      console.error('Error seeding database:', error);
      throw new Error('Failed to seed database');
    }
  }

  async createProduct(product: CreateProductDto): Promise<Products> {
    try {
      const newProduct = this.productsRepository.create(product); 
      const savedProduct = await this.productsRepository.save(newProduct); 
      return savedProduct; 
    } catch (error) {
      throw new HttpException(
        'Failed to create product',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deleteProductById(id: number): Promise<DeleteResult> {
    const product = await this.productsRepository.findOne({ where: { id } });
    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    return await this.productsRepository.delete(id);
  }

  async updateProductStock(id: number, stock: number): Promise<Products> {
    const product = await this.productsRepository.findOne({ where: { id } });
    if (!product) {
      throw new Error('Product not found');
    }
    product.stock = stock;
    return await this.productsRepository.save(product);
  }

    async getProductById(id: number): Promise<Products> {
    const product = await this.productsRepository.findOne({ where: { id } });
    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    return product;
  }

  async getProductsFromDb(): Promise<Products[]> {
    try {
      return await this.productsRepository.find();
    } catch (error) {
      throw new HttpException(
        'Failed to retrieve products',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
