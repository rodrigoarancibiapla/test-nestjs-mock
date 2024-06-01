import { Test, TestingModule } from "@nestjs/testing";
import { TestDepService } from "./testdepservice.service";
import { ConfigService } from "@nestjs/config";

describe("TestdepserviceService", () => {
  let service: TestDepService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestDepService, ConfigService],
    }).compile();

    service = module.get<TestDepService>(TestDepService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should return a sum", () => {
    const sum = service.sum(1, 2);
    expect(sum).toEqual(3);
  });

  it("should return a substraction", () => {
    const substraction = service.substract(10, 2);
    expect(substraction).toEqual(8);
  });
});
