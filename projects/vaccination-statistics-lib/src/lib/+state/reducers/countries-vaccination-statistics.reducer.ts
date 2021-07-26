import { CountriesVaccinationStatisticsActions } from '@covid19-vaccination-statistics-lib/lib/+state/actions';
import { CountryVaccinationStatistic } from '@covid19-vaccination-statistics-lib/lib/models';
import { createReducer, on } from '@ngrx/store';

const actions = CountriesVaccinationStatisticsActions;

export const COUNTRIES_VACCINATION_STATISTICS_FEATURE_KEY =
  'countriesVaccinationStatistics';

export interface CountriesVaccinationStatisticsState {
  loading: boolean;
  countriesVaccinationStatistics: CountryVaccinationStatistic[];
}

const initialState: CountriesVaccinationStatisticsState = {
  loading: false,
  countriesVaccinationStatistics: [],
};

export const reducer = createReducer(
  initialState,
  on(actions.load, (state) => ({
    ...state,
    loading: true,
  })),
  on(actions.loaded, (state, { vaccinationStatistics }) => ({
    ...state,
    loading: false,
    countriesVaccinationStatistics: vaccinationStatistics,
  })),
  on(actions.loadFailed, (state) => ({
    ...state,
    loading: false,
  }))
);

export const loading = (state: CountriesVaccinationStatisticsState) =>
  state.loading;

export const countriesVaccinationStatistics = (
  state: CountriesVaccinationStatisticsState
) => state.countriesVaccinationStatistics;
