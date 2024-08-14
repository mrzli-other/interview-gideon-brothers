import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map, Observable, of } from 'rxjs';

@Component({
  selector: 'update-robot-type',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './update-robot-type.component.html',
})
export class UpdateRobotTypeComponent {
  public id$: Observable<number | undefined> = of(undefined);

  public constructor(private readonly route: ActivatedRoute) {}

  public ngOnInit(): void {
    this.id$ = this.route.paramMap.pipe(
      map((params) => {
        const value = params.get('id') ?? undefined;
        return value !== undefined ? Number.parseInt(value, 10) : undefined;
      }),
    );
  }
}
