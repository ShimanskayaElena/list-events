import { Component, Input, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators, } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { EventData } from '../../shared/interfaces/store';


@Component({
  selector: 'app-sport-event-form',
  imports: [  ReactiveFormsModule, MatFormFieldModule, MatInputModule ],
  templateUrl: './sport-event-form.component.html',
  styleUrl: './sport-event-form.component.scss'
})
export class SportEventFormComponent implements OnInit {
  @Input() parentForm!: FormGroup;
  fb: FormBuilder = inject(FormBuilder);
  public readonly data = inject<EventData>(MAT_DIALOG_DATA);

  ngOnInit() {
    if (this.parentForm && !this.parentForm.contains('participants')) {
      this.parentForm.addControl('participants', this.fb.control(0, Validators.required));
      if (this.data && this.data.participants) {
        this.parentForm.patchValue({ participants: this.data.participants });
      }
    }
  }
}
