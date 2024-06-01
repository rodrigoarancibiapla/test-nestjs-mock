import { AutoMap } from "@automapper/classes";

export class DummyModel {
  products: ProductModel[];
  total: number;
  skip: number;
  limit: number;
}

export class ProductModel {
  @AutoMap()
  id: number;
  @AutoMap()
  title: string;
  @AutoMap()
  description: string;
  @AutoMap()
  price: number;
  @AutoMap()
  discountPercentage: number;
  @AutoMap()
  rating: number;
  @AutoMap()
  stock: number;
  @AutoMap()
  brand: string;
  @AutoMap()
  category: string;
  @AutoMap()
  thumbnail: string;
  @AutoMap()
  images: string[];
}
