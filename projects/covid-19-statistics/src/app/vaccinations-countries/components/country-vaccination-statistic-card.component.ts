import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {
  PROPER_BLUE,
  PROPER_GREEN,
  PROPER_GREY,
  PROPER_RED,
  PROPER_YELLOW,
  SEMI_PROPER_RED,
} from '@covid19-statistics/core/core.constants';
import { CountryVaccinationStatistic } from '@covid19-vaccination-statistics-lib/public-api';

@Component({
  selector: 'covid19-country-vaccination-statistic-card',
  templateUrl: './country-vaccination-statistic-card.component.html',
  styleUrls: ['./country-vaccination-statistic-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryVaccinationStatisticCardComponent implements OnInit {
  /*
  cases,
  active cases,
  new cases,
  deaths,
  new deaths,
  recovered,
  */
  public colorScheme = [
    PROPER_GREY,
    PROPER_BLUE,
    PROPER_YELLOW,
    PROPER_RED,
    SEMI_PROPER_RED,
    PROPER_GREEN,
  ];

  @Input() countryVaccinationStatistic: CountryVaccinationStatistic;

  constructor() {}

  ngOnInit(): void {}
}
