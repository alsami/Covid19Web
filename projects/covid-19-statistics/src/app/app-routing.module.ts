import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(
      [
        {
          path: '',
          redirectTo: 'infections/global',
          pathMatch: 'full',
        },
        {
          path: 'infections/global',
          loadChildren: async () =>
            (await import('./global/global-stats.module')).GlobalStatsModule,
        },
        {
          path: 'infections/countries',
          loadChildren: async () =>
            (await import('./countries/countries.module')).CountriesModule,
        },
        {
          path: 'vaccinations/countries',
          loadChildren: async () =>
            (
              await import(
                './vaccinations-countries/countries-vaccinations.module'
              )
            ).CountriesVaccinationsModule,
        },
      ],
      {
        useHash: false,
        relativeLinkResolution: 'legacy',
      }
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
