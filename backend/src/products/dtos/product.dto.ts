export class CreateProductDto {
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  stock: number;
}

export class UpdateStockDto {
  stock: number;
}
