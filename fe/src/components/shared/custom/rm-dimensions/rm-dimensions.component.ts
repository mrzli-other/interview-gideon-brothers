import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { NgClass } from '@angular/common';
import { Point } from '../../../../types';

@Component({
  selector: 'rm-dimensions',
  templateUrl: './rm-dimensions.component.html',
  standalone: true,
  imports: [NgClass],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RmDimensionsComponent),
      multi: true,
    },
  ],
})
export class RmDimensionsComponent implements ControlValueAccessor {
  @Input() public width = DEFAULT_WIDTH;
  @Input() public height = DEFAULT_HEIGHT;
  @Input() public isError = true;

  public value: readonly Point[] = [];
  public touched = false;
  public disabled = false;

  public getDisplayValue(): string {
    return JSON.stringify(this.value);
  }

  public writeValue(value: readonly Point[]): void {
    this.value = value;
  }

  public registerOnChange(fn: ChangeFn): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: TouchedFn): void {
    this.onTouched = fn;
  }

  public setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public onChange: ChangeFn = EMPTY_FN;
  public onTouched: TouchedFn = EMPTY_FN;

  private setValue(value: readonly Point[]): void {
    this.markAsTouched();
    if (!this.disabled) {
      this.value = value;
      this.onChange(value);
    }
  }

  private markAsTouched(): void {
    if (!this.touched) {
      this.touched = true;
      this.onTouched();
    }
  }
}

type ChangeFn = (value: readonly Point[]) => void;
type TouchedFn = () => void;

const EMPTY_FN = () => {};

const DEFAULT_WIDTH = 200;
const DEFAULT_HEIGHT = 200;
