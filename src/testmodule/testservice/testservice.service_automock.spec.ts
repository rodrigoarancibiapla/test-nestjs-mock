import { TestService } from "./testservice.service";
import {
  ITestDepService,
  TestDepService,
} from "../testdepservice/testdepservice.service";
import { TestBed } from "@automock/jest";

describe("TestService", () => {
  let service: TestService;
  let testDepServiceMock;

  beforeAll(async () => {
    testDepServiceMock = jest.mocked<ITestDepService>({
      sum: jest.fn(), // Mock the sum method
      rest: jest.fn(),
    });

    const { unit, unitRef } = TestBed.create(TestService).compile();
    service = unit;
    testDepServiceMock = unitRef.get(TestDepService);
  });

  it("should calculate the power of the sum", () => {
    const a = 2;
    const b = 3;
    const sumResult = 5;

    testDepServiceMock.sum.mockReturnValue(sumResult); // Explicitly cast to jest.Mock

    const result = service.powSum(a, b);
    expect(result).toEqual(Math.pow(sumResult, 2));
    expect(testDepServiceMock.sum).toHaveBeenCalledWith(a, b);
  });
});
