export interface CountryVaccinationStatistic {
  country: string;
  countryCode: string;
  loggedAt: Date;
  totalVaccinations: number;
  peopleVaccinated: number;
  peopleFullyVaccinated: number;
  peopleFullyVaccinatedPerHundred: number;
  dailyVaccinations: number;
  totalVaccinationsPerHundred: number;
  peopleVaccinatedPerHundred: number;
  dailyVaccinationsPerMillion: number;
}
