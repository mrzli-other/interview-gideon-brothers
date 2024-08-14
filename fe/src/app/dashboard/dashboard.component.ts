import { Component } from '@angular/core';
import { CardData } from './dasbboard-card/card-data';
import { DashboardCardComponent } from './dasbboard-card/dashboard-card.component';

@Component({
  selector: 'dashboard',
  standalone: true,
  imports: [DashboardCardComponent],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  private readonly _cardData: readonly CardData[];

  public get cardData(): readonly CardData[] {
    return this._cardData;
  }

  public constructor() {
    this._cardData = [
      { label: 'Robot Types', url: '/robot-types' },
      { label: 'Robots', url: '/robots' },
    ];
  }

  public handleCardClick(url: string): void {
    console.log(`Navigating to ${url}`);
  }
}
