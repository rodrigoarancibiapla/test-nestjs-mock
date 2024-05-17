import { MyService } from './my.service';
import { IMyOtherService } from './my.other.service';
import { TestBed } from '@automock/jest';
import { productsMockResponse } from './mocks/products';
import { createMap, type Mapper } from '@automapper/core';
import { createMapper } from '@automapper/core';
import { classes } from '@automapper/classes';
import { ProductModel } from './product.model';
import { ProductDTO } from './product.dto';

describe('MymoduleService, autmock version', () => {
  let service: MyService;
  let myOtherServiceMock: jest.Mocked<IMyOtherService> = {
    getProducts: jest.fn(),
    splitNumber: jest.fn(),
    asyncSplitNumber: jest.fn(),
  };
  let mapper: Mapper;
  beforeAll(() => {
    const { unit, unitRef } = TestBed.create(MyService).compile();
    service = unit;
    myOtherServiceMock = unitRef.get('otherservice');
    mapper = unitRef.get('automapper:nestjs:default');
    const mapperM = createMapper({
      strategyInitializer: classes(),
    });
    createMap(mapperM, ProductModel, ProductDTO);
    mapper.mapArray = jest.fn().mockImplementation(mapperM.mapArray);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a sum', () => {
    expect(service.addition(1, 2)).toEqual(3);
  });

  it('should return a sum from a async function', async () => {
    expect(await service.myAsyncAddition(1, 2)).toEqual(3);
  });

  it('should return a sum from a async function', async () => {
    myOtherServiceMock.splitNumber = jest.fn().mockReturnValue('3.0');
    expect(await service.splitAddition(10, 20)).toEqual('3.0');
    expect(myOtherServiceMock.splitNumber).toHaveBeenCalledTimes(1);
  });

  it('shoud return products', async () => {
    myOtherServiceMock.getProducts = jest
      .fn()
      .mockResolvedValue(productsMockResponse);
    const result = await service.getProducts();
    const resultData = [
      { id: 1, brand: 'Apple', price: 549, stock: 94 },
      { id: 2, brand: 'Apple', price: 899, stock: 34 },
      { id: 3, brand: 'Samsung', price: 1249, stock: 36 },
    ];
    expect(result).toEqual(resultData);
  });
});
