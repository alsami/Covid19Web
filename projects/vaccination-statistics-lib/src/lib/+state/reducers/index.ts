import {
  Action,
  combineReducers,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as fromCountriesVaccinationStatistics from './countries-vaccination-statistics.reducer';

export interface VaccinationsState {
  [fromCountriesVaccinationStatistics.COUNTRIES_VACCINATION_STATISTICS_FEATURE_KEY]: fromCountriesVaccinationStatistics.CountriesVaccinationStatisticsState;
}

export const VACCINATION_FEATURE_KEY = 'vaccinations';

export interface VaccinationsFeatureState {
  [VACCINATION_FEATURE_KEY]: VaccinationsState;
}

/** Provide reducer in AoT-compilation happy way */
export function reducers(state: VaccinationsState | undefined, action: Action) {
  return combineReducers({
    [fromCountriesVaccinationStatistics.COUNTRIES_VACCINATION_STATISTICS_FEATURE_KEY]:
      fromCountriesVaccinationStatistics.reducer,
  })(state, action);
}

export const selectVaccinationFeatureState = createFeatureSelector<
  VaccinationsFeatureState,
  VaccinationsState
>(VACCINATION_FEATURE_KEY);

export const selectVaccinationState = createSelector(
  selectVaccinationFeatureState,
  (state: VaccinationsState) => state.countriesVaccinationStatistics
);

export const selectCountriesVaccinationStatisticsLoading = createSelector(
  selectVaccinationState,
  fromCountriesVaccinationStatistics.loading
);

export const selectCountriesVaccinationStatistics = createSelector(
  selectVaccinationState,
  fromCountriesVaccinationStatistics.countriesVaccinationStatistics
);
