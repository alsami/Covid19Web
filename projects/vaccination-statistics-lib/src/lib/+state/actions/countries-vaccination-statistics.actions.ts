import { CountryVaccinationStatistic } from '@covid19-vaccination-statistics-lib/lib/models';
import { createAction, props } from '@ngrx/store';

enum Types {
  Load = '[Countries Vaccination Statistics] Load',
  Loaded = '[Countries Vaccination Statistics] Loaded',
  LoadFailed = '[Countries Vaccination Statistics] Load Failed',
}

export const load = createAction(Types.Load);
export const loaded = createAction(
  Types.Loaded,
  props<{ vaccinationStatistics: CountryVaccinationStatistic[] }>()
);
export const loadFailed = createAction(Types.LoadFailed);
