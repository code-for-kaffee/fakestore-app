import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { HttpModule } from '@nestjs/axios';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from 'src/database/entity/product.entity';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Products])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
