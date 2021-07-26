import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@covid19-statistics/material/material.module';
import { SharedModule } from '@covid19-statistics/shared/shared.module';
import { CountryVaccinationStatisticCardComponent } from '@covid19-statistics/vaccinations-countries/components/country-vaccination-statistic-card.component';
import { CountriesVaccinationStatisticsOverviewComponent } from '@covid19-statistics/vaccinations-countries/containers';
import { CountriesVaccinationsRoutingModule } from '@covid19-statistics/vaccinations-countries/countries-vaccinations-routing.module';
import {
  CountriesVaccinationStatisticsEffects,
  fromVaccinationStatistics,
  VaccinationStatisticsLibModule,
} from '@covid19-vaccination-statistics-lib/public-api';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

const CONTAINER = [CountriesVaccinationStatisticsOverviewComponent];
const COMPONENTS = [CountryVaccinationStatisticCardComponent];

@NgModule({
  declarations: [...CONTAINER, ...COMPONENTS],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    CountriesVaccinationsRoutingModule,
    VaccinationStatisticsLibModule,
    StoreModule.forFeature(
      fromVaccinationStatistics.VACCINATION_FEATURE_KEY,
      fromVaccinationStatistics.reducers
    ),
    EffectsModule.forFeature([CountriesVaccinationStatisticsEffects]),
  ],
})
export class CountriesVaccinationsModule {}
