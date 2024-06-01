// test.module.spec.ts
import { Test, TestingModule } from "@nestjs/testing";
import { TestService } from "./testservice/testservice.service";
import { TestDepService } from "./testdepservice/testdepservice.service";
import { TestModule } from "./testmodule.module";

describe("TestModule", () => {
  let testService: TestService;
  let testDepService: TestDepService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TestModule],
    }).compile();

    testService = module.get<TestService>(TestService);
    testDepService = module.get<TestDepService>(TestDepService);
  });

  it("should provide TestService", () => {
    expect(testService).toBeDefined();
  });

  it("should provide TestDepService", () => {
    expect(testDepService).toBeDefined();
  });
});
