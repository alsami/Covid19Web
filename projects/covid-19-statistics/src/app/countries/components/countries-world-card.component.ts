import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { CountryStats } from '@covid19-country-statistics-lib/public-api';
import {
  DARK_BACKGROUND,
  LIGHT_BACKGROUND,
  PROPER_GREEN,
  PROPER_RED,
} from '@covid19-statistics/core/core.constants';
import { fromEvent, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'covid19-countries-world-card',
  templateUrl: './countries-world-card.component.html',
  styleUrls: ['./countries-world-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountriesWorldCardComponent implements OnChanges, OnDestroy {
  @Input() countryStats: CountryStats[];
  @Input() darkThemeSelected: boolean;

  private chart: google.visualization.GeoChart;
  private dataTable: any;
  private fillColor: string = '';

  validMaps: { [key: string]: string } = {
    ['UK']: 'United Kingdom',
    ['USA']: 'United States',
    ['UAE']: 'United Arab Emirates',
    ['S. Korea']: 'South Korea',
    ['Czechia']: 'Czech Republic',
  };

  resizeObservable$: Observable<Event>;
  resizeSubscription$: Subscription;

  public constructor() {
    google.charts.setOnLoadCallback(() => {
      this.chart = new google.visualization.GeoChart(
        this.element.nativeElement
      );

      this.resizeObservable$ = fromEvent(window, 'resize');
      this.resizeSubscription$ = this.resizeObservable$.subscribe(() => {
        this.chart.clearChart();
        this.draw(this.dataTable);
      });

      if (!this.countryStats) {
        return;
      }

      this.dataTable = this.createDataTable();

      this.draw(this.dataTable);
    });
  }

  private options: google.visualization.GeoChartOptions = {
    keepAspectRatio: true,
    // legend: 'none',
    datalessRegionColor: PROPER_GREEN,
    backgroundColor: {
      // TODO THEME
      fill: this.fillColor,
    },
    colorAxis: {
      colors: ['#ffd600', '#f8a900', '#e97c00', '#d35011', PROPER_RED],
      // colors: ['#ef5350', '#e14643', '#d33936', '#c52c29', '#b71c1c'],
      // colors: ['#ef9a9a', '#ef7d79', '#ea5e56', '#e23c31', '#d50000'],
    },
    defaultColor: '#212121',
    resolution: 'countries',
    legend: 'none',
  };

  @ViewChild('card', { static: true }) element: ElementRef;

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.darkThemeSelected) {
      this.fillColor = this.darkThemeSelected
        ? DARK_BACKGROUND
        : LIGHT_BACKGROUND;
    }

    if (!this.chart || !this.countryStats) {
      return;
    }

    this.dataTable = this.createDataTable();
    this.draw(this.dataTable);
  }

  public ngOnDestroy(): void {
    this.resizeSubscription$.unsubscribe();
  }

  private createDataTable(): any {
    const array = [];
    const filteredCountryStats = this.countryStats
      .slice()
      .filter((stats) => stats.country !== 'Réunion')
      .filter((stats) => stats.country !== 'Ré;union')
      .filter((stats) => stats.country !== 'Channel Islands')
      .filter((stats) => stats.country !== 'Palestine')
      .filter((stats) => stats.country !== 'Faeroe Islands')
      .filter((stats) => stats.country !== 'Sint Maarten')
      .filter((stats) => stats.country !== 'CAR')
      .filter((stats) => stats.country !== 'Vatican City')
      .filter((stats) => stats.country !== 'North Macedonia')
      .filter((stats) => stats.country !== 'DRC')
      .filter((stats) => stats.country !== 'Saint Martin')
      .filter((stats) => stats.country !== 'Cabo Verde')
      .filter((stats) => stats.country !== 'Curaçao')
      .filter((stats) => stats.country !== 'Congo')
      .filter((stats) => stats.country !== 'Eswatini')
      .filter((stats) => stats.country !== 'St. Barth')
      .filter((stats) => stats.country !== 'Turks and Caicos')
      .filter((stats) => stats.country !== 'Caribbean Netherlands')
      .filter((stats) => stats.country !== 'Saint Pierre Miquelon')
      .filter((stats) => stats.country !== 'South Sudan')
      .filter((stats) => stats.country !== 'Timor-Leste')
      .filter((stats) => stats.country !== 'St. Vincent Grenadines');

    array.push(['Country', 'Active Cases', 'Deaths']);

    filteredCountryStats.forEach((stats) => {
      array.push([
        this.getGeoCountry(stats),
        stats.activeCases,
        stats.totalDeaths,
      ]);
    });

    return google.visualization.arrayToDataTable(array);
  }

  private getGeoCountry(countryStats: CountryStats): string {
    const val = this.validMaps[countryStats.country];

    return val ? val : countryStats.country;
  }

  private draw(dataTable: any): void {
    this.chart.draw(dataTable, this.options);
  }
}
