import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LinkData } from '../types';
import { LinksComponent } from '../shared';

@Component({
  selector: 'robots',
  standalone: true,
  imports: [RouterLink, RouterOutlet, LinksComponent],
  templateUrl: './robots.component.html',
})
export class RobotsComponent {
  public readonly links: readonly LinkData[] = [
    { label: 'Dashboard', url: '/dashboard' },
    { label: 'Robot Types', url: '/robot-types' },
  ];
}
