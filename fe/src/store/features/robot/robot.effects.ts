import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RobotApiService, SnackbarService } from '../../../services';
import { RobotActions } from './robot.actions';
import { of, catchError, concat, map, switchMap, Observable, tap } from 'rxjs';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';

@Injectable()
export class RobotEffects {
  public readonly getAll$: Observable<Action<string>>;
  public readonly create$: Observable<Action<string>>;
  public readonly get$: Observable<Action<string>>;
  public readonly update$: Observable<Action<string>>;
  public readonly delete$: Observable<Action<string>>;

  public constructor(
    private readonly actions$: Actions,
    private readonly robotApiService: RobotApiService,
    private readonly snakcbarService: SnackbarService,
    private readonly router: Router,
  ) {
    this.getAll$ = createEffect(() => this.pipeGetAll());
    this.create$ = createEffect(() => this.pipeCreate());
    this.get$ = createEffect(() => this.pipeGet());
    this.update$ = createEffect(() => this.pipeUpdate());
    this.delete$ = createEffect(() => this.pipeDelete());
  }

  private pipeGetAll(): Observable<Action<string>> {
    return this.actions$.pipe(
      ofType(RobotActions.getAll),
      switchMap(() =>
        concat(
          of(RobotActions.getAllPending()),
          this.robotApiService.getAllRobots().pipe(
            map((robots) =>
              RobotActions.getAllSuccess({ payload: robots }),
            ),
            catchError((error) => {
              this.snakcbarService.show('Error getting robots.');
              return of(RobotActions.getAllError({ error }));
            }),
          ),
        ),
      ),
    );
  }

  private pipeCreate(): Observable<Action<string>> {
    return this.actions$.pipe(
      ofType(RobotActions.create),
      switchMap((action) =>
        concat(
          of(RobotActions.createPending()),
          this.robotApiService.createRobot(action.payload).pipe(
            tap(() => {
              this.router.navigate(['robots']);
              this.snakcbarService.show('Robot created.');
            }),
            map((robot) =>
              RobotActions.createSuccess({ payload: robot }),
            ),
            catchError((error) => {
              this.snakcbarService.show('Error creating robot.');
              return of(RobotActions.createError({ error }));
            }),
          ),
        ),
      ),
    );
  }

  private pipeGet(): Observable<Action<string>> {
    return this.actions$.pipe(
      ofType(RobotActions.get),
      switchMap((action) =>
        concat(
          of(RobotActions.getPending()),
          this.robotApiService.getRobot(action.payload.id).pipe(
            map((robot) =>
              RobotActions.getSuccess({ payload: robot }),
            ),
            catchError((error) => {
              this.snakcbarService.show('Error getting robot.');
              return of(RobotActions.getError({ error }));
            }),
          ),
        ),
      ),
    );
  }

  private pipeUpdate(): Observable<Action<string>> {
    return this.actions$.pipe(
      ofType(RobotActions.update),
      switchMap((action) =>
        concat(
          of(RobotActions.updatePending()),
          this.robotApiService.updateRobot(action.payload).pipe(
            tap(() => {
              this.router.navigate(['robot-types']);
              this.snakcbarService.show('Robot updated.');
            }),
            map((robot) =>
              RobotActions.updateSuccess({ payload: robot }),
            ),
            catchError((error) => {
              this.snakcbarService.show('Error updating robot.');
              return of(RobotActions.updateError({ error }));
            }),
          ),
        ),
      ),
    );
  }

  private pipeDelete(): Observable<Action<string>> {
    return this.actions$.pipe(
      ofType(RobotActions.delete),
      switchMap((action) =>
        concat(
          of(RobotActions.deletePending()),
          this.robotApiService.deleteRobot(action.payload.id).pipe(
            tap(() => {
              this.snakcbarService.show('Robot deleted.');
            }),
            map(() =>
              RobotActions.deleteSuccess({ payload: action.payload }),
            ),
            catchError((error) => {
              this.snakcbarService.show('Error deleting robot.');
              return of(RobotActions.deleteError({ error }));
            }),
          ),
        ),
      ),
    );
  }
}
