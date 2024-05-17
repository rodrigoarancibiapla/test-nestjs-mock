import { ConfigService } from '@nestjs/config';
import { Provider } from '@nestjs/common';

export const ServiceUriProvider: Provider = {
  provide: 'SERVICE_URI',
  useFactory: (configService: ConfigService): string => {
    return configService.get<string>('SERVICE_URI');
  },
  inject: [ConfigService],
};
