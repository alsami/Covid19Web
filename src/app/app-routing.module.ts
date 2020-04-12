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
          redirectTo: 'stats',
          pathMatch: 'full',
        },
        {
          path: 'stats',
          loadChildren: async () =>
            (await import('./global/global-stats.module')).GlobalStatsModule,
        },
        {
          path: 'countries',
          loadChildren: async () =>
            (await import('./countries/countries.module')).CountriesModule,
        },
      ],
      {
        useHash: false,
      }
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
