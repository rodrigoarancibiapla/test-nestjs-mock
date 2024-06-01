import { Test, TestingModule } from "@nestjs/testing";
import { MyService } from "./my.service";
import { productsMockResponse } from "../mocks/products";
import { AutomapperModule } from "@automapper/nestjs";
import { classes } from "@automapper/classes";

import { ProductMapper } from "../models/product.mapper";

describe("MymoduleService, classic version", () => {
  let service: MyService;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const myOtherServiceMock: jest.Mocked<any> = {
    // Mocking the getProducts method
    getProducts: jest.fn().mockResolvedValue(productsMockResponse),
    // Mock other methods if needed
    splitNumber: jest.fn(),
    asyncSplitNumber: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AutomapperModule.forRoot({
          strategyInitializer: classes(), // Use the 'classes' strategy initializer
        }),
      ],
      providers: [
        MyService,
        { provide: "otherservice", useValue: myOtherServiceMock },
        ProductMapper,
      ],
    }).compile();

    service = module.get<MyService>(MyService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should return a sum", () => {
    expect(service.addition(1, 2)).toEqual(3);
  });

  it("should return a sum from an async function", async () => {
    expect(await service.myAsyncAddition(1, 2)).toEqual(3);
  });

  it("should return a sum from an async function", async () => {
    myOtherServiceMock.splitNumber.mockReturnValue("5.0");
    expect(await service.splitAddition(20, 20)).toEqual("5.0");
    expect(myOtherServiceMock.splitNumber).toHaveBeenCalledTimes(1);
  });

  it("shoud return products", async () => {
    const result = await service.getProducts();
    const resultData = [
      { id: 1, brand: "Apple", price: 549, stock: 94 },
      { id: 2, brand: "Apple", price: 899, stock: 34 },
      { id: 3, brand: "Samsung", price: 1249, stock: 36 },
    ];
    expect(result).toEqual(resultData);
  });
});
