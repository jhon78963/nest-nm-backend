import { Module } from '@nestjs/common';
import { ColorModule } from './color/color.module';
import { GenderModule } from './gender/gender.module';
import { ProductModule } from './product/product.module';
import { SizeModule } from './size/size.module';
import { WarehouseModule } from './warehouse/warehouse.module';

@Module({
  imports: [
    ColorModule,
    GenderModule,
    ProductModule,
    SizeModule,
    WarehouseModule,
  ],
  providers: [],
  exports: [
    ColorModule,
    GenderModule,
    ProductModule,
    SizeModule,
    WarehouseModule,
  ],
})
export class InventoryModule {}
