import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { CONFIG_OPTIONS_TOKEN, ConfigOptions } from './config-options';
import { provideState, provideStore } from '@ngrx/store';
import {
  RobotEffects,
  robotFeature,
  RobotTypeEffects,
  robotTypeFeature,
} from '../store';
import { routes } from '../routing/app.routes';
import { provideEffects } from '@ngrx/effects';
import { environment } from '../environments';

export function createAppConfig(): ApplicationConfig {
  return {
    providers: [
      provideZoneChangeDetection({ eventCoalescing: true }),
      provideRouter(routes),
      provideAnimations(),
      provideHttpClient(),
      provideStore(),
      provideState(robotTypeFeature),
      provideState(robotFeature),
      provideEffects(RobotTypeEffects, RobotEffects),
      {
        provide: CONFIG_OPTIONS_TOKEN,
        useValue: getConfigOptions(),
      },
    ],
  };
}

function getConfigOptions(): ConfigOptions {
  return {
    apiBaseUrl: environment.apiBaseUrl,
  };
}
