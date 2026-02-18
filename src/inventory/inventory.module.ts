import { Module } from '@nestjs/common';
import { ColorModule } from './color/color.module';
import { GenderModule } from './gender/gender.module';
import { ProductModule } from './product/product.module';
import { SizeTypeModule } from './size/size-type.module';
import { SizeModule } from './size/size.module';
import { WarehouseModule } from './warehouse/warehouse.module';

@Module({
  imports: [
    ColorModule,
    GenderModule,
    ProductModule,
    SizeModule,
    SizeTypeModule,
    WarehouseModule,
  ],
  providers: [],
  exports: [
    ColorModule,
    GenderModule,
    ProductModule,
    SizeModule,
    SizeTypeModule,
    WarehouseModule,
  ],
})
export class InventoryModule {}
