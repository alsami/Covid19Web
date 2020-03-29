import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CountryStats } from '@covid19/countries/models';
import { retryHandler } from '@covid19/shared/functions';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class CountryStatsDayHistoryService {
  private readonly baseUrl = environment.apiUrl;

  public constructor(private readonly http: HttpClient) {}

  public load(country: string): Observable<CountryStats[]> {
    return this.http
      .get<CountryStats[]>(
        `${this.baseUrl}stats/countries/${country}/dayhistory`
      )
      .pipe(retryHandler());
  }
}
