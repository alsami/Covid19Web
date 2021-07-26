import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@covid19-statistics-environment/environment';
import { CountryVaccinationStatistic } from '@covid19-vaccination-statistics-lib/lib/models';
import { Observable } from 'rxjs';

@Injectable()
export class CountriesVaccinationStatisticsService {
  private readonly baseUrl;

  public constructor(private readonly http: HttpClient) {
    this.baseUrl = `${environment.apiUrl}vaccination-statistics`;
  }

  public load(): Observable<CountryVaccinationStatistic[]> {
    return this.http.get<CountryVaccinationStatistic[]>(this.baseUrl);
  }
}
