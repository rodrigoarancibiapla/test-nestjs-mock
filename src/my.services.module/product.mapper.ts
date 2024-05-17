// product.mapper.ts
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, type Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { ProductModel } from './product.model';
import { ProductDTO } from './product.dto';

@Injectable()
export class ProductMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, ProductModel, ProductDTO);
    };
  }
}
