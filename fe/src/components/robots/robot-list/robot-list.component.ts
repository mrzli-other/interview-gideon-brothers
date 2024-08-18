import { AsyncPipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription, combineLatest } from 'rxjs';
import { robotFeature, RobotActions, robotTypeFeature } from '../../../store';
import { Robot, RobotType } from '../../../types';
import {
  ConfirmationDialogComponent,
  ConfirmationDialogInputData,
} from '../../shared';

@Component({
  selector: 'robot-list',
  standalone: true,
  imports: [AsyncPipe, MatTableModule, MatIconModule, MatButton],
  templateUrl: './robot-list.component.html',
})
export class RobotListComponent implements OnInit, OnDestroy {
  public items: readonly RobotView[] = [];

  public readonly displayedColumns: readonly string[] = [
    'id',
    'name',
    'robotType',
    'actions',
  ];

  private itemsSubscription: Subscription | undefined = undefined;

  public constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly dialog: MatDialog,
    private readonly store: Store,
  ) {}

  public ngOnInit(): void {
    this.itemsSubscription = combineLatest([
      this.store.select(robotFeature.selectRobots),
      this.store.select(robotTypeFeature.selectRobotTypes),
    ]).subscribe(([robots, robotTypes]) => {
      this.items = getRobotViews(robots, robotTypes);
    });
  }

  public ngOnDestroy(): void {
    this.itemsSubscription?.unsubscribe();
  }

  public handleEditItem(item: Robot): void {
    this.router.navigate(['update', item.id], { relativeTo: this.route });
  }

  public handleDeleteItem(item: Robot): void {
    const { id, name } = item;

    const dialogRef = this.dialog.open<
      ConfirmationDialogComponent,
      ConfirmationDialogInputData
    >(ConfirmationDialogComponent, {
      data: {
        title: 'Delete Robot',
        text: [`Are you sure you want to delete robot '${name}'?`],
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.store.dispatch(RobotActions.delete({ payload: { id } }));
      }
    });
  }

  public handleCreateNewRobot(): void {
    this.router.navigate(['create'], { relativeTo: this.route });
  }
}

interface RobotView {
  readonly id: number;
  readonly name: string;
  readonly robotType: string;
}

function getRobotViews(
  robots: readonly Robot[] | undefined,
  robotTypes: readonly RobotType[] | undefined,
): readonly RobotView[] {
  if (robots === undefined || robotTypes === undefined) {
    return [];
  }

  const robotTypeMap: ReadonlyMap<number, RobotType> = new Map(
    robotTypes.map((robotType) => [robotType.id, robotType] as const),
  );

  return robots.map((robot) => {
    const robotType = robotTypeMap.get(robot.robotTypeId);
    if (robotType === undefined) {
      console.warn(`Robot type with ID ${robot.robotTypeId} not found`);
    }

    return {
      id: robot.id,
      name: robot.name,
      robotType: robotType?.name ?? 'Unknown',
    };
  });
}
