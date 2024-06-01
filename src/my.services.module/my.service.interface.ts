import { ProductDTO } from "./models/product.dto";

export interface IMyService {
  addition(a: number, b: number): number;
  myAsyncAddition(a: number, b: number): Promise<number>;
  splitAddition(a: number, b: number): string;
  getProducts(): Promise<ProductDTO[]>;
}
