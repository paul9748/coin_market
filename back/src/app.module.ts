import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { SellModule } from './sell/sell.module';
import { BuyModule } from './buy/buy.module';
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
    SellModule,
    BuyModule,
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
