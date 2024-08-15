import { Inject, Injectable } from '@angular/core';
import { CONFIG_OPTIONS_TOKEN, ConfigOptions } from './config-options';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private readonly _configOptions: ConfigOptions;

  public get configOptions(): ConfigOptions {
    return this._configOptions;
  }

  public constructor(
    @Inject(CONFIG_OPTIONS_TOKEN) configOptions: ConfigOptions,
  ) {
    this._configOptions = configOptions;
  }
}
