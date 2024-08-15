import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LinkData } from '../types';
import { LinksComponent } from '../shared';

@Component({
  selector: 'robot-types',
  standalone: true,
  imports: [RouterLink, RouterOutlet, LinksComponent],
  templateUrl: './robot-types.component.html',
})
export class RobotTypesComponent {
  public readonly links: readonly LinkData[] = [
    { label: 'Dashboard', url: '/dashboard' },
    { label: 'Robot Types', url: '/robot-types' },
    { label: 'Robots', url: '/robots' },
  ];
}
