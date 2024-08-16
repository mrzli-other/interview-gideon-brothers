import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'input[rm-text-input]',
  template: '',
  styles: [
    ':host[rm-text-input] { @apply border px-2 py-1 rounded outline-none; }',
    ':host[rm-text-input][disabled] { @apply text-gray-300 border-gray-300 cursor-not-allowed; }',
  ],
  standalone: true,
})
export class RmTextInputComponent {}
