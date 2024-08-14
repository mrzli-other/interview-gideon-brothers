import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LinkData } from '../../types';

@Component({
  selector: 'dashboard-card',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-card.component.html',
  host: {
    '[class]':
      '"w-20 h-20 inline-flex justify-center items-center border border-gray-300 rounded-lg select-none cursor-pointer hover:bg-gray-100"',
    '(click)': 'handleClick()',
  },
})
export class DashboardCardComponent {
  private _data: LinkData | undefined = undefined;

  public get data(): LinkData | undefined {
    return this._data;
  }

  @Input()
  public set data(value: LinkData | undefined) {
    this._data = value;
  }

  @Output() onClick = new EventEmitter<string>();

  public handleClick(): void {
    const url = this.data?.url;
    if (url !== undefined) {
      this.onClick.emit(url);
    }
  }
}
