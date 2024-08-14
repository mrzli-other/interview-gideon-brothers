import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { RobotType } from '../../../types';

@Component({
  selector: 'robot-type-list',
  standalone: true,
  imports: [MatTableModule],
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

  public displayedColumns: readonly string[] = ['id', 'name', 'dimensions'];
}
