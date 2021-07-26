import { Injectable } from '@angular/core';
import { CountriesVaccinationStatisticsActions } from '@covid19-vaccination-statistics-lib/lib/+state/actions';
import { CountriesVaccinationStatisticsService } from '@covid19-vaccination-statistics-lib/lib/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

@Injectable()
export class CountriesVaccinationStatisticsEffects {
  loadCountriesVaccinationStatistics$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CountriesVaccinationStatisticsActions.load),
      mergeMap(() =>
        this.service.load().pipe(
          map((vaccinations) =>
            CountriesVaccinationStatisticsActions.loaded({
              vaccinationStatistics: vaccinations,
            })
          ),
          catchError(() =>
            of(CountriesVaccinationStatisticsActions.loadFailed())
          )
        )
      )
    )
  );

  public constructor(
    private readonly actions$: Actions,
    private readonly service: CountriesVaccinationStatisticsService
  ) {}
}
