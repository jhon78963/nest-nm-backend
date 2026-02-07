import { Module } from '@nestjs/common';
import { ColorModule } from '../color/color.module';
import { SizeModule } from '../size/size.module';
import { GenderModule } from '../gender/gender.module';
import { WarehouseModule } from '../warehouse/warehouse.module';

@Module({
  imports: [ColorModule, SizeModule, GenderModule, WarehouseModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class ProductModule {}
