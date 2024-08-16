import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RobotTypeApiService } from '../../../services/robot-type-api.service';
import { RobotTypeActions } from './robot-type.actions';
import { of, catchError, concat, map, switchMap, Observable } from 'rxjs';
import { Action } from '@ngrx/store';

@Injectable()
export class RobotTypeEffects {
  public readonly getAll$: Observable<Action<string>>;
  public readonly create$: Observable<Action<string>>;
  public readonly get$: Observable<Action<string>>;
  public readonly update$: Observable<Action<string>>;
  public readonly delete$: Observable<Action<string>>;

  public constructor(
    actions$: Actions,
    robotTypeApiService: RobotTypeApiService,
  ) {
    this.getAll$ = createEffect(() =>
      pipeGetAll(actions$, robotTypeApiService),
    );
    this.create$ = createEffect(() =>
      pipeCreate(actions$, robotTypeApiService),
    );
    this.get$ = createEffect(() => pipeGet(actions$, robotTypeApiService));
    this.update$ = createEffect(() =>
      pipeUpdate(actions$, robotTypeApiService),
    );
    this.delete$ = createEffect(() =>
      pipeDelete(actions$, robotTypeApiService),
    );
  }
}

function pipeGetAll(
  actions$: Actions,
  robotTypeApiService: RobotTypeApiService,
): Observable<Action<string>> {
  return actions$.pipe(
    ofType(RobotTypeActions.getAll),
    switchMap(() =>
      concat(
        of(RobotTypeActions.getAllPending()),
        robotTypeApiService.getAllRobotTypes().pipe(
          map((robotTypes) =>
            RobotTypeActions.getAllSuccess({ payload: robotTypes }),
          ),
          catchError((error) => {
            return of(RobotTypeActions.getAllError({ error }));
          }),
        ),
      ),
    ),
  );
}

function pipeCreate(
  actions$: Actions,
  robotTypeApiService: RobotTypeApiService,
): Observable<Action<string>> {
  return actions$.pipe(
    ofType(RobotTypeActions.create),
    switchMap((action) =>
      concat(
        of(RobotTypeActions.createPending()),
        robotTypeApiService.createRobotType(action.payload).pipe(
          map((robotType) =>
            RobotTypeActions.createSuccess({ payload: robotType }),
          ),
          catchError((error) => {
            return of(RobotTypeActions.createError({ error }));
          }),
        ),
      ),
    ),
  );
}

function pipeGet(
  actions$: Actions,
  robotTypeApiService: RobotTypeApiService,
): Observable<Action<string>> {
  return actions$.pipe(
    ofType(RobotTypeActions.get),
    switchMap((action) =>
      concat(
        of(RobotTypeActions.getPending()),
        robotTypeApiService.getRobotType(action.payload.id).pipe(
          map((robotType) =>
            RobotTypeActions.getSuccess({ payload: robotType }),
          ),
          catchError((error) => {
            return of(RobotTypeActions.getError({ error }));
          }),
        ),
      ),
    ),
  );
}

function pipeUpdate(
  actions$: Actions,
  robotTypeApiService: RobotTypeApiService,
): Observable<Action<string>> {
  return actions$.pipe(
    ofType(RobotTypeActions.update),
    switchMap((action) =>
      concat(
        of(RobotTypeActions.updatePending()),
        robotTypeApiService.updateRobotType(action.payload).pipe(
          map((robotType) =>
            RobotTypeActions.updateSuccess({ payload: robotType }),
          ),
          catchError((error) => {
            return of(RobotTypeActions.updateError({ error }));
          }),
        ),
      ),
    ),
  );
}

function pipeDelete(
  actions$: Actions,
  robotTypeApiService: RobotTypeApiService,
): Observable<Action<string>> {
  return actions$.pipe(
    ofType(RobotTypeActions.delete),
    switchMap((action) =>
      concat(
        of(RobotTypeActions.deletePending()),
        robotTypeApiService.deleteRobotType(action.payload.id).pipe(
          map(() =>
            RobotTypeActions.deleteSuccess({ payload: action.payload }),
          ),
          catchError((error) => {
            return of(RobotTypeActions.deleteError({ error }));
          }),
        ),
      ),
    ),
  );
}
