import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { RobotType } from '../../../types';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import {
  ConfirmationDialogComponent,
  ConfirmationDialogInputData,
} from '../../shared';
import { MatButton } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { robotTypeFeature } from '../../../store';
import { map, Subscription } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'robot-type-list',
  standalone: true,
  imports: [AsyncPipe, MatTableModule, MatIconModule, MatButton],
  templateUrl: './robot-type-list.component.html',
})
export class RobotTypeListComponent implements OnInit, OnDestroy {
  public items: readonly RobotType[] = [];

  public readonly displayedColumns: readonly string[] = [
    'id',
    'name',
    'dimensions',
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
      .select(robotTypeFeature.selectRobotTypes)
      .pipe(
        map((robotTypes) => {
          return robotTypes ?? [];
        }),
      )
      .subscribe((items) => {
        console.log('RobotTypeListComponent: items', items);
        this.items = items;
      });
  }

  public ngOnDestroy(): void {
    if (this.itemsSubscription !== undefined) {
      this.itemsSubscription.unsubscribe();
    }
  }

  public handleEditItem(item: RobotType): void {
    this.router.navigate(['update', item.id], { relativeTo: this.route });
  }

  public handleDeleteItem(item: RobotType): void {
    const { name } = item;

    const dialogRef = this.dialog.open<
      ConfirmationDialogComponent,
      ConfirmationDialogInputData
    >(ConfirmationDialogComponent, {
      data: {
        title: 'Delete Robot Type',
        text: [
          `Are you sure you want to delete robot type '${name}'?`,
          'This action will also delete all robots of that type!',
        ],
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        console.log(`Deleting robot type '${name}'`);
      }
    });
  }

  public handleCreateNewRobotType(): void {
    this.router.navigate(['create'], { relativeTo: this.route });
  }
}
