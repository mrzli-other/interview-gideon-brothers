import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { RobotTypeActions } from '../store';

@Injectable()
export class AppService {
  public constructor(private readonly store: Store) {}

  public fetchAllData(): void {
    this.store.dispatch(RobotTypeActions.getAll());
  }
}
