import { Inject, Injectable } from "@nestjs/common";
import { MyOtherService } from "./my.other.service";
import { ProductDTO } from "../models/product.dto";
import { ProductModel } from "../models/product.model";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/types";

@Injectable()
export class MyService {
  constructor(
    @Inject("otherservice") private myotherService: MyOtherService,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  addition(a: number, b: number): number {
    return a + b;
  }

  async myAsyncAddition(a: number, b: number): Promise<number> {
    return a + b;
  }

  splitAddition(a: number, b: number): string {
    return this.myotherService.splitNumber(a + b);
  }

  async getProducts(): Promise<ProductDTO[]> {
    return this.mapper.mapArray(
      await this.myotherService.getProducts(),
      ProductModel,
      ProductDTO,
    );
  }
}
