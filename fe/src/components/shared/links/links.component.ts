import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LinkData } from './link-data';

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
