import { Test, TestingModule } from '@nestjs/testing';
import { TestService } from './testservice.service';
import { TestDepService } from '../testdepservice/testdepservice.service';
import { ConfigService } from '@nestjs/config';

describe('TestserviceService', () => {
  let service: TestService;
  let depService: TestDepService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestService, TestDepService, ConfigService],
    }).compile();

    service = module.get<TestService>(TestService);
    depService = module.get<TestDepService>(TestDepService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('depService should be defined', () => {
    expect(depService).toBeDefined();
  });

  it('should return powwe of two of a sum', () => {
    expect(service.powSum(1, 2)).toEqual(9);
  });
});
