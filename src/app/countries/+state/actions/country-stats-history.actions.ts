import { CountryStats } from '@covid19/countries/models';
import { createAction, props } from '@ngrx/store';

export const load = createAction(
  '[Country cases stats history] Load history for country',
  props<{ country: string }>()
);
export const loaded = createAction(
  '[Country cases stats history] Loaded history for country',
  props<{ countryStats: CountryStats[] }>()
);
export const loadFailed = createAction(
  '[Country cases stats history] Load history for country failed'
);