import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, map, Observable, of, Subscription } from 'rxjs';
import { robotFeature, RobotActions, robotTypeFeature } from '../../../store';
import { Robot, RobotType, RobotUpdate } from '../../../types';
import {
  RmButtonComponent,
  RmSelectComponent,
  RmTextInputComponent,
} from '../../shared';
import { getIntParam, isFormFieldError } from '../../util';
import { transformIfNotUndefined, parseIntOrThrow } from '../../../util';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'update-robot',
  standalone: true,
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    RmButtonComponent,
    RmTextInputComponent,
    RmSelectComponent,
  ],
  templateUrl: './update-robot.component.html',
})
export class UpdateRobotComponent implements OnInit, OnDestroy {
  public robotTypes$: Observable<readonly RobotType[]> = of([]);

  public form: FormGroup = new FormGroup({});

  public robot: Robot | undefined = undefined;

  private robotSubscription: Subscription | undefined = undefined;

  public constructor(
    private readonly route: ActivatedRoute,
    private readonly store: Store,
    private readonly fb: FormBuilder,
  ) {}

  public ngOnInit(): void {
    this.robotTypes$ = this.store
      .select(robotTypeFeature.selectRobotTypes)
      .pipe(map((robotTypes) => robotTypes ?? []));

    this.robotSubscription = combineLatest([
      this.route.paramMap,
      this.store.select(robotFeature.selectRobots),
    ])
      .pipe(
        map(([params, robots]) => {
          const id = getIntParam(params, 'id');

          if (id === undefined) {
            return undefined;
          }

          return robots?.find((robot) => robot.id === id);
        }),
      )
      .subscribe((robot: Robot | undefined) => {
        this.robot = robot;

        this.form = this.fb.group({
          name: [
            robot?.name ?? '',
            [
              Validators.required,
              Validators.minLength(1),
              Validators.maxLength(255),
            ],
          ],
          robotTypeId: [
            robot?.robotTypeId ?? '',
            [Validators.required, Validators.pattern(/^[1-9]\d{0,10}$/)],
          ],
        });
      });
  }

  public ngOnDestroy(): void {
    this.robotSubscription?.unsubscribe();
  }

  public handleSubmit(): void {
    if (this.robot === undefined || this.form.invalid) {
      return;
    }

    const robotTypeId = transformIfNotUndefined(
      this.form.value.robotTypeId ?? undefined,
      parseIntOrThrow,
    );

    if (robotTypeId === undefined) {
      return;
    }

    const data: RobotUpdate = {
      id: this.robot.id,
      name: this.form.value.name ?? '',
      robotTypeId,
    };

    this.store.dispatch(RobotActions.update({ payload: data }));
  }

  public isError(field: string): boolean {
    return isFormFieldError(this.form, field);
  }
}
