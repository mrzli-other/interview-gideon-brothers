import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Subscription, combineLatest } from 'rxjs';
import { getIntParam, isFormFieldError } from '../../util';
import { Store } from '@ngrx/store';
import { RobotTypeActions, robotTypeFeature } from '../../../store';
import { Point, RobotType, RobotTypeUpdate } from '../../../types';
import {
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import {
  RmButtonComponent,
  RmDimensionsComponent,
  RmTextInputComponent,
} from '../../shared';

@Component({
  selector: 'update-robot-type',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RmButtonComponent,
    RmTextInputComponent,
    RmDimensionsComponent,
  ],
  templateUrl: './update-robot-type.component.html',
})
export class UpdateRobotTypeComponent implements OnInit, OnDestroy {
  public form = new FormGroup({
    name: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(255),
    ]),
    dimensions: new FormControl<readonly Point[]>([], [Validators.required]),
  });

  public robotType: RobotType | undefined = undefined;

  private robotTypeSubscription: Subscription | undefined = undefined;

  public constructor(
    private readonly route: ActivatedRoute,
    private readonly store: Store,
  ) {}

  public ngOnInit(): void {
    this.robotTypeSubscription = combineLatest([
      this.route.paramMap,
      this.store.select(robotTypeFeature.selectRobotTypes),
    ])
      .pipe(
        map(([params, robotTypes]) => {
          const id = getIntParam(params, 'id');

          if (id === undefined) {
            return undefined;
          }

          return robotTypes?.find((robotType) => robotType.id === id);
        }),
      )
      .subscribe((robotType: RobotType | undefined) => {
        this.robotType = robotType;

        this.form.setValue({
          name: robotType?.name ?? '',
          dimensions: robotType?.dimensions ?? [],
        });
      });
  }

  public ngOnDestroy(): void {
    this.robotTypeSubscription?.unsubscribe();
  }

  public handleSubmit(): void {
    if (this.robotType === undefined || this.form.invalid) {
      return;
    }

    const data: RobotTypeUpdate = {
      id: this.robotType.id,
      name: this.form.value.name ?? '',
      dimensions: this.form.value.dimensions ?? [],
    };

    this.store.dispatch(RobotTypeActions.update({ payload: data }));
  }

  public isError(field: string): boolean {
    return isFormFieldError(this.form, field);
  }
}
