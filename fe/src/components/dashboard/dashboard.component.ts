import { Component } from '@angular/core';
import { DashboardCardComponent } from './dasbboard-card/dashboard-card.component';
import { Router } from '@angular/router';
import { LinkData } from '../shared';

@Component({
  selector: 'dashboard',
  standalone: true,
  imports: [DashboardCardComponent],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  private readonly _linkDataList: readonly LinkData[];

  public get linkDataList(): readonly LinkData[] {
    return this._linkDataList;
  }

  public constructor(private readonly router: Router) {
    this._linkDataList = [
      { label: 'Robot Types', url: '/robot-types' },
      { label: 'Robots', url: '/robots' },
    ];
  }

  public handleCardClick(url: string): void {
    this.router.navigate([url]);
  }
}
