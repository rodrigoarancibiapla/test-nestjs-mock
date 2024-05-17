import { Test, TestingModule } from '@nestjs/testing';
import { MyServicesModule } from './mymodule.module';
import { MyService } from './my.service';
import { MyOtherService } from './my.other.service';
import { ConfigModule } from '@nestjs/config';

describe('MymoduleModule', () => {
  let module: TestingModule;
  let mymoduleService: MyService;
  let mymoduleOtherService: MyOtherService;
  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        MyServicesModule,
        ConfigModule.forRoot({
          isGlobal: true,
        }),
      ],
    }).compile();

    mymoduleService = module.get<MyService>('myservice');
    mymoduleOtherService = module.get<MyOtherService>('otherservice');
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should provide the MymoduleService', () => {
    expect(mymoduleService).toBeDefined();
  });
  it('should provide the MymoduleService', () => {
    expect(mymoduleOtherService).toBeDefined();
  });
});
