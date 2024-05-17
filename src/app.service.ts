import { Inject, Injectable } from '@nestjs/common';
import { IMyService } from './my.services.module/my.service.interface';

@Injectable()
export class AppService {
  constructor(@Inject('myservice') private myService: IMyService) {}

  async getStockSummary(): Promise<any> {
    const products = await this.myService.getProducts();

    const stockSummary = {};
    // Iterate over the products array
    products.forEach((product) => {
      // Extract brand and stock from each product
      const { brand, stock } = product;

      // If brand is not already in the stockSummary, initialize it with 0
      if (!stockSummary[brand]) {
        stockSummary[brand] = 0;
      }

      // Add the stock of the current product to the total stock of the brand
      stockSummary[brand] += stock;
    });

    return stockSummary;
  }
}
