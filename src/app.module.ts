import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MyServicesModule } from './my.services.module/mymodule.module';
import { ConfigModule } from '@nestjs/config';
import { TestModule } from './testmodule/testmodule.module';
@Module({
  imports: [
    MyServicesModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TestModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: 'appservice',
      useClass: AppService,
    },
  ],
})
export class AppModule {}
