import { AsyncPipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription, map } from 'rxjs';
import { robotFeature, RobotActions } from '../../../store';
import { Robot } from '../../../types';
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
  public items: readonly Robot[] = [];

  public readonly displayedColumns: readonly string[] = [
    'id',
    'name',
    'robotTypeId',
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
    this.itemsSubscription = this.store
      .select(robotFeature.selectRobots)
      .pipe(
        map((robots) => {
          return robots ?? [];
        }),
      )
      .subscribe((items) => {
        this.items = items;
      });
  }

  public ngOnDestroy(): void {
    if (this.itemsSubscription !== undefined) {
      this.itemsSubscription.unsubscribe();
    }
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
