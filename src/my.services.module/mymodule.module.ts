import { Module } from '@nestjs/common';
import { MyOtherService } from './services/my.other.service';
import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { ConfigService } from '@nestjs/config';
import { ProductMapper } from './models/product.mapper';
import { MyService } from './services/my.service';
import { ServiceUriProvider } from './service.uri.provider';

@Module({
  imports: [
    AutomapperModule.forRoot({
      strategyInitializer: classes(), // Use the 'classes' strategy initializer
    }),
  ],
  providers: [
    { provide: 'myservice', useClass: MyService },
    { provide: 'otherservice', useClass: MyOtherService },
    ConfigService,
    ProductMapper,
    ServiceUriProvider,
  ],
  exports: ['myservice','otherservice'],
})
export class MyServicesModule {}
