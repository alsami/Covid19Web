import { DecimalPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '@covid19-statistics-environment/environment';
import { metaReducers, reducers } from '@covid19-statistics/+state';
import { AppRoutingModule } from '@covid19-statistics/app-routing.module';
import {
  EndSidenavContentComponent,
  SidenavContentComponent,
  ToolbarComponent,
} from '@covid19-statistics/components';
import { LayoutComponent } from '@covid19-statistics/containers';
import {
  CountriesOfInterestEffects,
  LayoutEffects,
  TitleEffects,
} from '@covid19-statistics/core/+state/effects';
import { CoreModule } from '@covid19-statistics/core/core.module';
import { InterfacePreferencesModule } from '@covid19-statistics/interface-preferences/interface-preferences.module';
import { LoadersModule } from '@covid19-statistics/loaders/loaders.module';
import { MaterialModule } from '@covid19-statistics/material/material.module';
import { CountryFlagPipe } from '@covid19-statistics/shared/pipes';
import { SharedModule } from '@covid19-statistics/shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';

const COMPONENTS = [
  AppComponent,
  LayoutComponent,
  SidenavContentComponent,
  ToolbarComponent,
  EndSidenavContentComponent,
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CoreModule.forRoot(),
    BrowserModule,
    SharedModule,
    LoadersModule,
    MaterialModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    InterfacePreferencesModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
    }),
    EffectsModule.forRoot([
      TitleEffects,
      CountriesOfInterestEffects,
      LayoutEffects,
    ]),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
  ],
  providers: [DecimalPipe, CountryFlagPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
