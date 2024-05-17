import { AppService } from './app.service';
import { MyService } from './my.services.module/my.service';
import { TestBed } from '@automock/jest';

describe('AppService', () => {
  let appService: AppService;
  let myServiceMock: jest.Mocked<MyService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(AppService).compile();
    appService = unit;
    myServiceMock = unitRef.get('myservice');
  });

  it('should return stock summary', async () => {
    // Mocked products data
    const mockedProducts = [
      { id: 1, brand: 'Apple', price: 549, stock: 94 },
      { id: 2, brand: 'Apple', price: 899, stock: 34 },
      { id: 3, brand: 'Samsung', price: 1249, stock: 36 },
    ];

    // Mock the return value of getProducts method
    myServiceMock.getProducts.mockResolvedValue(mockedProducts);

    // Call the method being tested
    const result = await appService.getStockSummary();

    // Assert the result
    expect(result).toEqual({
      Apple: 128,
      Samsung: 36,
    });
  });

  it('should handle empty products array', async () => {
    // Mock an empty array for products
    myServiceMock.getProducts.mockResolvedValue([]);

    // Call the method being tested
    const result = await appService.getStockSummary();

    // Assert the result when products array is empty
    expect(result).toEqual({});
  });
});
