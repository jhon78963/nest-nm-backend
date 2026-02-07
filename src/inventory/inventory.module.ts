import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { ColorModule } from './color/color.module';
import { SizeModule } from './size/size.module';
import { GenderModule } from './gender/gender.module';
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
  exports: [],
})
export class InventoryModule {}
