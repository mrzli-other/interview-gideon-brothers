import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LinkData } from '../types';
import { LinksComponent } from '../shared';

@Component({
  selector: 'robots',
  standalone: true,
  imports: [RouterLink, LinksComponent],
  templateUrl: './robot-types.component.html',
})
export class RobotTypesComponent {
  public readonly links: readonly LinkData[] = [
    { label: 'Dashboard', url: '/dashboard' },
    { label: 'Robots', url: '/robots' },
  ];
}
