import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  public constructor(private readonly snackBar: MatSnackBar) {}

  public show(message: string): void {
    this.snackBar.open(message, '', {
      duration: 5000,
      horizontalPosition: 'left',
      verticalPosition: 'bottom',
    });
  }
}
