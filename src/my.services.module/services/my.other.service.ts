import { Inject, Injectable } from "@nestjs/common";
import axios from "axios";
import { ProductModel } from "../models/product.model";

export interface IMyOtherService {
  splitNumber(n: number): string;
  asyncSplitNumber(n: number): Promise<string>;
  getProducts(): Promise<ProductModel[]>;
}

@Injectable()
export class MyOtherService {
  constructor(@Inject("SERVICE_URI") private readonly serviceUri: string) {}

  splitNumber(n: number): string {
    if (n >= 0) return n.toString().split("").join(".");
    else throw Error("invalid number");
  }

  async asyncSplitNumber(n: number): Promise<string> {
    if (n >= 0) return n.toString().split("").join(".");
    else throw Error("invalid number");
  }

  async getProducts(): Promise<ProductModel[]> {
    const response = await axios.get(this.serviceUri);
    if (response.data != undefined) return response.data.products;
    else throw Error("Axios error");
  }
}
