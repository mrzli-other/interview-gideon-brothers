import { Component, Input } from '@angular/core';

@Component({
  selector: 'select[rm-select]',
  template: '<ng-content></ng-content>',
  styles: [
    ':host[rm-select] { @apply border px-2 py-1 rounded outline-none; }',
    ':host[rm-select][disabled] { @apply text-gray-300 border-gray-300 cursor-not-allowed; }',
  ],
  standalone: true,
  host: {
    '[class.border-red-400]': 'isError',
  },
})
export class RmSelectComponent {
  @Input() public isError = false;
}
