import { Component } from '@angular/core';

@Component({
  selector: '[rm-button]',
  template: '<ng-content></ng-content>',
  styles: [
    ':host[rm-button] { @apply font-semibold border px-3 py-1 rounded; }',
    ':host[rm-button][disabled] { @apply text-gray-300 border-gray-300 cursor-not-allowed; }',
  ],
  standalone: true,
})
export class RmButtonComponent {}
