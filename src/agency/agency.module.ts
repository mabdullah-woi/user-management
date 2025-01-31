import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agency } from './agency.entity';
import { AgencyRepository } from './agency.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Agency])],
  controllers: [],
  providers: [AgencyRepository],
  exports: [],
})
export class AgencyModule {}
