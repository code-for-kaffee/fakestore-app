import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ProductsService } from './products/products.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, 
  });
  const productService = app.get(ProductsService);
  if (productService.getAllProductsFromFakeStoreApi.length === 0) {
    await productService.seedDatabase();
  }
  await app.listen(3000);
}
bootstrap();
