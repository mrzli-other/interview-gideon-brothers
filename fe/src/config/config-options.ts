import { InjectionToken } from '@angular/core';

export const CONFIG_OPTIONS_TOKEN = new InjectionToken<ConfigOptions>(
  'PROVIDER_KEY_CONFIG_OPTIONS_TOKEN',
);

export interface ConfigOptions {
  readonly apiBaseUrl: string;
}
