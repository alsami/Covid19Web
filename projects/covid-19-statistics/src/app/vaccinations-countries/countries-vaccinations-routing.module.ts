import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountriesVaccinationStatisticsOverviewComponent } from '@covid19-statistics/vaccinations-countries/containers';

const routes: Routes = [
  {
    path: '',
    component: CountriesVaccinationStatisticsOverviewComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CountriesVaccinationsRoutingModule {}
