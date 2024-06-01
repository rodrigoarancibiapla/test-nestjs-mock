import { Controller, Get, Inject } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(@Inject("appservice") private readonly appService: AppService) {}
  @Get("/getStockSummary")
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async getStockSummary(): Promise<any> {
    const summary = await this.appService.getStockSummary();
    return summary;
  }
}
