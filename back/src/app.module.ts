import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { SalesModule } from './sales/sales.module';
import { BuysModule } from './buys/buys.module';
import { DeliveriesModule } from './deliveries/deliveries.module';
import { DealsModule } from './deals/deals.module';
import { AddressesModule } from './addresses/addresses.module';
import { AnalysesModule } from './analyses/analyses.module';
import { CoinsModule } from './coins/coins.module';
import { CountriesModule } from './countries/countries.module';
import { WalletsModule } from './wallets/wallets.module';

@Module({
  imports: [
    UsersModule,
    SalesModule,
    BuysModule,
    DeliveriesModule,
    DealsModule,
    AddressesModule,
    AnalysesModule,
    CoinsModule,
    CountriesModule,
    WalletsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
