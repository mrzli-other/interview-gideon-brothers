import { ParamMap } from '@angular/router';
import { transformIfNotUndefined, parseIntOrThrow } from '../../util';

export function getIntParam(params: ParamMap, key: string): number | undefined {
  const value = params.get(key) ?? undefined;
  return transformIfNotUndefined(value, parseIntOrThrow);
}
