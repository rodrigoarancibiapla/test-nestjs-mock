import { Test } from "@nestjs/testing";
import { TestService } from "./testservice.service";
import { TestDepService } from "../testdepservice/testdepservice.service";
import { ConfigService } from "@nestjs/config";

describe("TestService", () => {
  let service: TestService;
  let testDepServiceMock: TestDepService;

  beforeEach(async () => {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    testDepServiceMock = {
      sum: jest.fn(), // Mock the sum method
    } as any; // Cast to any to allow assigning jest.Mock to it
    /* eslint-enable @typescript-eslint/no-explicit-any */
    const moduleRef = await Test.createTestingModule({
      providers: [
        TestService,
        {
          provide: TestDepService,
          useValue: testDepServiceMock,
        },
        ConfigService,
      ],
    }).compile();

    service = moduleRef.get<TestService>(TestService);
  });

  it("should calculate the power of the sum", () => {
    const a = 2;
    const b = 3;
    const sumResult = 5;

    (testDepServiceMock.sum as jest.Mock).mockReturnValue(sumResult); // Explicitly cast to jest.Mock

    const result = service.powSum(a, b);
    expect(result).toEqual(Math.pow(sumResult, 2));
    expect(testDepServiceMock.sum).toHaveBeenCalledWith(a, b);
  });
});
