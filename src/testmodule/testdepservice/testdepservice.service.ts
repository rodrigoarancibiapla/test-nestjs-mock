import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface ITestDepService {
  sum(a, b);
  rest(a, b);
}

@Injectable()
export class TestDepService {
  constructor(private configService: ConfigService) {}
  sum(a, b): number {
    return a + b;
  }

  substract(a, b): number {
    return a - b;
  }
}
