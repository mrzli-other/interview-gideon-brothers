import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { CONFIG_OPTIONS_TOKEN, ConfigOptions } from './config-options';
import { provideState, provideStore } from '@ngrx/store';
import { RobotTypeEffects, robotTypeFeature } from '../store';
import { routes } from '../routing/app.routes';
import { provideEffects } from '@ngrx/effects';

export function createAppConfig(): ApplicationConfig {
  return {
    providers: [
      provideZoneChangeDetection({ eventCoalescing: true }),
      provideRouter(routes),
      provideAnimations(),
      provideHttpClient(),
      provideStore(),
      provideState(robotTypeFeature),
      provideEffects(RobotTypeEffects),
      {
        provide: CONFIG_OPTIONS_TOKEN,
        useValue: getConfigOptions(),
      },
    ],
  };
}

function getConfigOptions(): ConfigOptions {
  return {
    apiBaseUrl: 'http://localhost:5000',
  };
}
