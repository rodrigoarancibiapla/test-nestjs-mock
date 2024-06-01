import { Injectable } from "@nestjs/common";
import { TestDepService } from "../testdepservice/testdepservice.service";

export interface ITestService {
  powSum(a, b);
}

@Injectable()
export class TestService {
  constructor(private readonly testDepService: TestDepService) {}

  powSum(a, b) {
    return Math.pow(this.testDepService.sum(a, b), 2);
  }
}
