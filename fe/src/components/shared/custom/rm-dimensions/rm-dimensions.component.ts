import {
  AfterViewInit,
  Component,
  ElementRef,
  forwardRef,
  Input,
  ViewChild,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { NgClass } from '@angular/common';
import { Point } from '../../../../types';
import paper from 'paper';

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
export class RmDimensionsComponent
  implements ControlValueAccessor, AfterViewInit
{
  @Input() public width = DEFAULT_WIDTH;
  @Input() public height = DEFAULT_HEIGHT;
  @Input() public isError = true;

  @ViewChild('canvas', { static: true })
  private canvasRef: ElementRef<HTMLCanvasElement> | undefined;

  private _value: readonly Point[] = [];

  public get value(): readonly Point[] {
    return this._value;
  }

  public set value(value: readonly Point[]) {
    this._value = value;
    this.draw();
  }

  public touched = false;
  public disabled = false;

  public ngAfterViewInit(): void {
    if (this.canvasRef !== undefined) {
      paper.setup(this.canvasRef.nativeElement);
    } else {
      console.error('Canvas not found.');
    }
    this.draw();
  }

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

  private draw(): void {
    const canvas = this.canvasRef?.nativeElement;
    if (!paper.project || !canvas) {
      return;
    }

    paper.project.clear();

    const value = this.value;
    const width = canvas.width;
    const height = canvas.height;

    const polygon = new paper.Path({
      strokeColor: 'black',
      closed: true,
    });

    for (let dataPoint of value) {
      const point = new paper.Point(dataPoint.x * width, dataPoint.y * height);

      const accentuatedPoint = new paper.Path.Circle({
        center: point,
        radius: 3,
        fillColor: 'black',
      });

      polygon.add(point);
    }
  }

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
