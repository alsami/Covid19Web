import { Component, OnInit } from '@angular/core';
import {
  CountriesVaccinationStatisticsActions,
  CountryVaccinationStatistic,
  fromVaccinationStatistics,
} from '@covid19-vaccination-statistics-lib/public-api';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'covid19-countries-vaccination-statistics-overview',
  templateUrl: './countries-vaccination-statistics-overview.component.html',
  styleUrls: ['./countries-vaccination-statistics-overview.component.scss'],
})
export class CountriesVaccinationStatisticsOverviewComponent implements OnInit {
  loading$: Observable<boolean>;
  countriesVaccinationStatistics$: Observable<CountryVaccinationStatistic[]>;

  public constructor(
    private readonly store: Store<fromVaccinationStatistics.VaccinationsFeatureState>
  ) {}

  public ngOnInit(): void {
    this.loading$ = this.store.pipe(
      select(
        fromVaccinationStatistics.selectCountriesVaccinationStatisticsLoading
      )
    );
    this.countriesVaccinationStatistics$ = this.store.pipe(
      select(fromVaccinationStatistics.selectCountriesVaccinationStatistics)
    );
    this.store.dispatch(CountriesVaccinationStatisticsActions.load());
  }
}
