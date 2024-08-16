import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RobotTypeApiService, SnackbarService } from '../../../services';
import { RobotTypeActions } from './robot-type.actions';
import { of, catchError, concat, map, switchMap, Observable, tap } from 'rxjs';
import { Action } from '@ngrx/store';

@Injectable()
export class RobotTypeEffects {
  public readonly getAll$: Observable<Action<string>>;
  public readonly create$: Observable<Action<string>>;
  public readonly get$: Observable<Action<string>>;
  public readonly update$: Observable<Action<string>>;
  public readonly delete$: Observable<Action<string>>;

  public constructor(
    private readonly actions$: Actions,
    private readonly robotTypeApiService: RobotTypeApiService,
    private readonly snakcbarService: SnackbarService,
  ) {
    this.getAll$ = createEffect(() => this.pipeGetAll());
    this.create$ = createEffect(() => this.pipeCreate());
    this.get$ = createEffect(() => this.pipeGet());
    this.update$ = createEffect(() => this.pipeUpdate());
    this.delete$ = createEffect(() => this.pipeDelete());
  }

  private pipeGetAll(): Observable<Action<string>> {
    return this.actions$.pipe(
      ofType(RobotTypeActions.getAll),
      switchMap(() =>
        concat(
          of(RobotTypeActions.getAllPending()),
          this.robotTypeApiService.getAllRobotTypes().pipe(
            map((robotTypes) =>
              RobotTypeActions.getAllSuccess({ payload: robotTypes }),
            ),
            catchError((error) => {
              this.snakcbarService.show('Error getting robot types.');
              return of(RobotTypeActions.getAllError({ error }));
            }),
          ),
        ),
      ),
    );
  }

  private pipeCreate(): Observable<Action<string>> {
    return this.actions$.pipe(
      ofType(RobotTypeActions.create),
      switchMap((action) =>
        concat(
          of(RobotTypeActions.createPending()),
          this.robotTypeApiService.createRobotType(action.payload).pipe(
            tap(() => {
              this.snakcbarService.show('Robot type created.');
            }),
            map((robotType) =>
              RobotTypeActions.createSuccess({ payload: robotType }),
            ),
            catchError((error) => {
              this.snakcbarService.show('Error creating robot type.');
              return of(RobotTypeActions.createError({ error }));
            }),
          ),
        ),
      ),
    );
  }

  private pipeGet(): Observable<Action<string>> {
    return this.actions$.pipe(
      ofType(RobotTypeActions.get),
      switchMap((action) =>
        concat(
          of(RobotTypeActions.getPending()),
          this.robotTypeApiService.getRobotType(action.payload.id).pipe(
            map((robotType) =>
              RobotTypeActions.getSuccess({ payload: robotType }),
            ),
            catchError((error) => {
              this.snakcbarService.show('Error getting robot type.');
              return of(RobotTypeActions.getError({ error }));
            }),
          ),
        ),
      ),
    );
  }

  private pipeUpdate(): Observable<Action<string>> {
    return this.actions$.pipe(
      ofType(RobotTypeActions.update),
      switchMap((action) =>
        concat(
          of(RobotTypeActions.updatePending()),
          this.robotTypeApiService.updateRobotType(action.payload).pipe(
            tap(() => {
              this.snakcbarService.show('Robot type updated.');
            }),
            map((robotType) =>
              RobotTypeActions.updateSuccess({ payload: robotType }),
            ),
            catchError((error) => {
              this.snakcbarService.show('Error updating robot type.');
              return of(RobotTypeActions.updateError({ error }));
            }),
          ),
        ),
      ),
    );
  }

  private pipeDelete(): Observable<Action<string>> {
    return this.actions$.pipe(
      ofType(RobotTypeActions.delete),
      switchMap((action) =>
        concat(
          of(RobotTypeActions.deletePending()),
          this.robotTypeApiService.deleteRobotType(action.payload.id).pipe(
            tap(() => {
              this.snakcbarService.show('Robot type deleted.');
            }),
            map(() =>
              RobotTypeActions.deleteSuccess({ payload: action.payload }),
            ),
            catchError((error) => {
              this.snakcbarService.show('Error deleting robot type.');
              return of(RobotTypeActions.deleteError({ error }));
            }),
          ),
        ),
      ),
    );
  }
}
