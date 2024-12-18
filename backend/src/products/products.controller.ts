import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateProductDto, UpdateStockDto } from './dtos/product.dto';
import { ProductsService } from './products.service';
import { Products } from 'src/database/entity/product.entity';
import { DeleteResult } from 'typeorm';

@Controller('/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getProductsFromDb(): Promise<any> {
    return await this.productsService.getProductsFromDb();
  }
  @Post('/seed')
  async seedDatabase(): Promise<string> {
    return await this.productsService.seedDatabase();
  }

  @Get('/:id')
  async getProductById(@Param('id') id: string): Promise<Products> {
    return await this.productsService.getProductById(Number(id));
  }

  @Post()
  async createNewProduct(@Body() body: CreateProductDto): Promise<Products> {
    return await this.productsService.createProduct(body);
  }

  @Put('/:id/stock')
  async updateProductStock(
    @Param('id') id: string,
    @Body() body: UpdateStockDto,
  ): Promise<Products> {
    return await this.productsService.updateProductStock(
      Number(id),
      body.stock,
    );
  }

  @Delete('/:id')
  async deleteProductById(@Param('id') id: string): Promise<DeleteResult> {
    return await this.productsService.deleteProductById(Number(id));
  }
}
