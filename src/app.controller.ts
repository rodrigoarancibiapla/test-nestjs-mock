import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(@Inject('appservice') private readonly appService: AppService) {}

  @Get('/getStockSummary')
  async getStockSummary(): Promise<any> {
    const summary = await this.appService.getStockSummary();
    return summary;
  }
}
