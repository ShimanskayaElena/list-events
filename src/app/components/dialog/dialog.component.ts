import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MatDialogRef
} from '@angular/material/dialog';

import { BaseEventFormComponent } from '../base-event-form/base-event-form.component';

@Component({
  selector: 'app-dialog',
  imports: [
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    BaseEventFormComponent
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {

  private readonly matDialogRef = inject(MatDialogRef);

  public onSubmit(event: boolean): void {
    if (event) this.matDialogRef.close(event);
  }
}
