import { Test, TestingModule } from '@nestjs/testing';
import { MyService } from './my.service';
import { MyOtherService } from './my.other.service';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { ConfigModule } from '@nestjs/config';
import { ServiceUriProvider } from '../service.uri.provider';

describe('MyService', () => {
  let myService: MyService;
  let myOtherServiceMock: jest.Mocked<MyOtherService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AutomapperModule.forRoot({
          strategyInitializer: classes(), // Use the 'classes' strategy initializer
        }),
        ConfigModule.forRoot(),
      ],
      providers: [
        MyService,
        ServiceUriProvider,
        { provide: 'otherservice', useClass: MyOtherService },
      ],
    }).compile();

    myService = module.get<MyService>(MyService);
    myOtherServiceMock = module.get('otherservice'); // Get the mock instance created by Jest
  });

  it('should be defined', () => {
    expect(myService).toBeDefined();
  });

  it('should call splitNumber method of MyOtherService with correct argument', () => {
    // Arrange
    const a = 30;
    const b = 40;

    // Set up mock function
    myOtherServiceMock.splitNumber = jest.fn().mockReturnValue('8.0');
    // Act
    const result = myService.splitAddition(a, b);

    // Assert
    expect(result).toBe('8.0');
    expect(myOtherServiceMock.splitNumber).toHaveBeenCalledWith(a + b);
    expect(myOtherServiceMock.splitNumber).toHaveBeenCalledTimes(1);
  });
});
