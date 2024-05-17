import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TestBed } from '@automock/jest';

describe('AppController', () => {
  let appController: AppController;
  let appServiceMock: jest.Mocked<AppService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(AppController).compile();
    appController = unit;
    appServiceMock = unitRef.get('appservice');
  });

  describe('root', () => {
    it('should return stock summary!"', async () => {
      const mockedSummary = {
        Apple: 128,
        Samsung: 36,
      };

      // Mock the getProducts method
      appServiceMock.getStockSummary.mockResolvedValue(mockedSummary);

      // Call the method being tested
      const result = await appController.getStockSummary();

      // Assert the result
      expect(result).toEqual({ Apple: 128, Samsung: 36 });
    });
  });
});
