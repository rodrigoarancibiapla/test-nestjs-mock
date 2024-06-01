import { MyOtherService } from './my.other.service';

import axios from 'axios';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { productsMockResponse } from '../mocks/products';
import { ServiceUriProvider } from '../service.uri.provider';

jest.mock('axios');

describe('MyOtherService', () => {
  let myOtherService: MyOtherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MyOtherService,
        ServiceUriProvider,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('https://dummyjson.com/products'), // Mock the method get of DataBaseConfigService
          },
        },
      ],
    }).compile();
    myOtherService = module.get<MyOtherService>(MyOtherService);
  });

  it('should split a number correctly', () => {
    // Arrange
    const number = 123456;
    const expectedResult = '1.2.3.4.5.6';

    // Act
    const result = myOtherService.splitNumber(number);

    // Assert
    expect(result).toBe(expectedResult);
  });

  it('should handle negative numbers correctly', () => {
    // Arrange
    const number = -123;
    expect(() => myOtherService.splitNumber(number)).toThrow('invalid number');
  });

  it('should handle zero correctly', () => {
    // Arrange
    const number = 0;
    const expectedResult = '0';

    // Act
    const result = myOtherService.splitNumber(number);

    // Assert
    expect(result).toBe(expectedResult);
  });

  it('should split a number async correctly ', async () => {
    // Arrange
    const number = 123456;
    const expectedResult = '1.2.3.4.5.6';

    // Act
    const result = await myOtherService.asyncSplitNumber(number);

    // Assert
    expect(result).toBe(expectedResult);
  });

  it('should handle negative numbers async correctly', async () => {
    // Arrange
    const number = -123;
    await expect(myOtherService.asyncSplitNumber(number)).rejects.toThrow(
      'invalid number',
    );
  });

  it('shoud return products, mocked function', async () => {
    const mockedData = {
      products: productsMockResponse,
      total: 100,
      skip: 0,
      limit: 3,
    };
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce({
      data: mockedData,
    });
    const result = await myOtherService.getProducts();

    expect(result).toEqual(mockedData.products);
    expect(axios.get).toHaveBeenCalledWith('https://dummyjson.com/products');
  });

  it('shoud return products, spyon', async () => {
    const mockedData = {
      products: productsMockResponse,
      total: 100,
      skip: 0,
      limit: 3,
    };
    const axiosGetSpy = jest.spyOn(axios, 'get');

    // Mock the resolved value of axios.get
    axiosGetSpy.mockResolvedValueOnce({ data: mockedData });
     const result = await myOtherService.getProducts();

    expect(result).toEqual(mockedData.products);
    expect(axios.get).toHaveBeenCalledWith('https://dummyjson.com/products');
  });

  it('should throw an error when axios call fails', async () => {
    // Mock the error from axios
    const mockedError = new Error('Axios error');
    const axiosGetSpy = jest.spyOn(axios, 'get');

    // Mock the resolved value of axios.get
   // axiosGetSpy.mockResolvedValueOnce(mockedError);
    //axiosGetSpy.mockImplementationOnce(()=>Promise.resolve(mockedError));
    axiosGetSpy.mockImplementationOnce(()=>Promise.reject(mockedError));

    // Call the getProducts method and expect it to throw an error
    await expect(myOtherService.getProducts()).rejects.toThrow(mockedError);
  });
});
