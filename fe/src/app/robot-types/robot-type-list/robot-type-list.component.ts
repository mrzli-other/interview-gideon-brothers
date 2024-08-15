import { Component, inject } from '@angular/core';
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

@Component({
  selector: 'robot-type-list',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatButton],
  templateUrl: './robot-type-list.component.html',
})
export class RobotTypeListComponent {
  public items: readonly RobotType[] = [
    {
      id: 1,
      name: 'Robot 1',
      dimensions: 'Robot 1 dimensions',
    },
    {
      id: 2,
      name: 'Robot 2',
      dimensions: 'Robot 2 dimensions',
    },
    {
      id: 3,
      name: 'Robot 3',
      dimensions: 'Robot 3 dimensions',
    },
  ];

  public displayedColumns: readonly string[] = [
    'id',
    'name',
    'dimensions',
    'actions',
  ];

  private readonly dialog = inject(MatDialog);

  public constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {}

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
