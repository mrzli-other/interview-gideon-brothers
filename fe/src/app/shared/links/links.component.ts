import { Component, Input } from '@angular/core';
import { LinkData } from '../../types';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'links',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './links.component.html',
})
export class LinksComponent {
  private _items: readonly LinkData[] | undefined = undefined;

  public get items(): readonly LinkData[] | undefined {
    return this._items;
  }

  @Input()
  public set items(value: readonly LinkData[] | undefined) {
    this._items = value;
  }
}
