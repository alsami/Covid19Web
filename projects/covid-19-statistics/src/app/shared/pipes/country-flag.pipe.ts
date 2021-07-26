import { Pipe, PipeTransform } from '@angular/core';
import { COUNTRY_CODE_UNAVAILABLE } from '@covid19-country-statistics-lib/lib/models';
import { environment } from '@covid19-statistics-environment/environment';
import { CountryOfInterest } from '@covid19-statistics/countries/models';
import { CountryVaccinationStatistic } from '@covid19-vaccination-statistics-lib/public-api';

@Pipe({
  name: 'countryFlag',
  pure: true,
})
export class CountryFlagPipe implements PipeTransform {
  public transform(
    countryValue: CountryOfInterest | CountryVaccinationStatistic
  ): string {
    if (
      !countryValue?.countryCode ||
      countryValue.countryCode === COUNTRY_CODE_UNAVAILABLE
    ) {
      return '';
    }
    return `${
      environment.apiUrl
    }countries/${countryValue.countryCode.toLowerCase()}/flag`;
  }
}
