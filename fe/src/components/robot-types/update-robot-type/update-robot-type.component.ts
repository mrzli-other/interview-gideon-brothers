import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Subscription, combineLatest } from 'rxjs';
import { getIntParam, isFormFieldError } from '../../util';
import { Store } from '@ngrx/store';
import { RobotTypeActions, robotTypeFeature } from '../../../store';
import { RobotType, RobotTypeUpdate } from '../../../types';
import {
  FormGroup,
  Validators,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { RmButtonComponent, RmTextInputComponent } from '../../shared';

@Component({
  selector: 'update-robot-type',
  standalone: true,
  imports: [ReactiveFormsModule, RmButtonComponent, RmTextInputComponent],
  templateUrl: './update-robot-type.component.html',
})
export class UpdateRobotTypeComponent implements OnInit, OnDestroy {
  public form: FormGroup = new FormGroup({});

  public robotType: RobotType | undefined = undefined;

  private robotTypeSubscription: Subscription | undefined = undefined;

  public constructor(
    private readonly route: ActivatedRoute,
    private readonly store: Store,
    private readonly fb: FormBuilder,
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

        this.form = this.fb.group({
          name: [
            robotType?.name ?? '',
            [
              Validators.required,
              Validators.minLength(1),
              Validators.maxLength(255),
            ],
          ],
          dimensions: [
            robotType?.dimensions ?? '',
            [
              Validators.required,
              Validators.minLength(1),
              Validators.maxLength(4096),
            ],
          ],
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
      dimensions: this.form.value.dimensions ?? '',
    };

    this.store.dispatch(RobotTypeActions.update({ payload: data }));
  }

  public isError(field: string): boolean {
    return isFormFieldError(this.form, field);
  }
}
