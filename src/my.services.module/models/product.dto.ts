import { AutoMap } from '@automapper/classes';

export class ProductDTO {
  @AutoMap()
  id: number;
  @AutoMap()
  price: number;
  @AutoMap()
  brand: string;
  @AutoMap()
  stock: number;
}
