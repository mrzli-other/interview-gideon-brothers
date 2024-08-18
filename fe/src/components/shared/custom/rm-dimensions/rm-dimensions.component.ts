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
import { MatIcon } from '@angular/material/icon';
import { pointListToPolygonString, round } from '../../../../util';

@Component({
  selector: 'rm-dimensions',
  templateUrl: './rm-dimensions.component.html',
  standalone: true,
  imports: [NgClass, MatIcon],
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
      // prevent opening of menu on right click
      this.canvasRef.nativeElement.oncontextmenu = (event: MouseEvent) => {
        event.preventDefault();
      };

      paper.setup(this.canvasRef.nativeElement);
      paper.view.onMouseDown = this.handleAddPoint.bind(this);
    } else {
      console.error('Canvas not found.');
    }
    this.draw();
  }

  public getDisplayValue(): string {
    return pointListToPolygonString(this.value);
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

  public handleAddPoint(event: paper.MouseEvent): void {
    event.preventDefault();

    const canvas = this.canvasRef?.nativeElement;
    if (!canvas) {
      return;
    }

    const canvasPoint: Point = {
      x: event.point.x,
      y: event.point.y,
    };

    const normalizedPoint = canvasToNormalizedPoint(canvasPoint, canvas);

    const value: readonly Point[] = [...this.value, normalizedPoint];
    this.setValue(value);
  }

  public handleRemoveLastPoint(event: MouseEvent): void {
    event.preventDefault();
    const value = this.value.slice(0, -1);
    this.setValue(value);
  }

  public clearAllPoints(event: MouseEvent): void {
    event.preventDefault();
    this.setValue([]);
  }

  private onChange: ChangeFn = EMPTY_FN;
  private onTouched: TouchedFn = EMPTY_FN;

  private draw(): void {
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas) {
      return;
    }

    draw(paper, canvas, this.value);
  }

  private setValue(value: readonly Point[]): void {
    if (this.disabled) {
      return;
    }

    this.value = value;
    this.onChange(this.value);
    this.markAsTouched();
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

function draw(
  paper: paper.PaperScope,
  canvas: HTMLCanvasElement,
  points: readonly Point[],
): void {
  if (!paper.project) {
    return;
  }

  paper.project.clear();

  const canvasPoints = points.map((point) =>
    normalizedToCanvasPoint(point, canvas),
  );

  const polygon = new paper.Path({
    strokeColor: 'black',
    closed: true,
  });

  for (let canvasPoint of canvasPoints) {
    const point = new paper.Point(canvasPoint.x, canvasPoint.y);

    new paper.Path.Circle({
      center: point,
      radius: 3,
      fillColor: 'black',
    });

    polygon.add(point);
  }
}

function canvasToNormalizedPoint(
  point: Point,
  canvas: HTMLCanvasElement,
): Point {
  return {
    x: round(point.x / canvas.width, NORMALIZED_POINT_PRECISION),
    y: round(point.y / canvas.height, NORMALIZED_POINT_PRECISION),
  };
}

// not necesasry, but makes numbers easier to read
const NORMALIZED_POINT_PRECISION = 3;

function normalizedToCanvasPoint(
  point: Point,
  canvas: HTMLCanvasElement,
): Point {
  return {
    x: point.x * canvas.width,
    y: point.y * canvas.height,
  };
}
