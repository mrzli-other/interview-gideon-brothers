import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, of } from 'rxjs';

@Component({
  selector: 'update-robot',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './update-robot.component.html',
})
export class UpdateRobotComponent implements OnInit {
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
