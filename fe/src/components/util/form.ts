import { FormGroup } from '@angular/forms';

export function isFormFieldError(form: FormGroup, field: string): boolean {
  const control = form.get(field) ?? undefined;
  return (
    control !== undefined &&
    control.invalid &&
    (control.touched || control.dirty)
  );
}
