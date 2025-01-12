import { Component, Input, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { EventData } from '../../shared/interfaces/store';


@Component({
  selector: 'app-music-event-form',
  imports: [ ReactiveFormsModule, MatFormFieldModule, MatInputModule ],
  templateUrl: './music-event-form.component.html',
  styleUrl: './music-event-form.component.scss'
})
export class MusicEventFormComponent implements OnInit {
  @Input() parentForm!: FormGroup;
  fb: FormBuilder = inject(FormBuilder);
  public readonly data = inject<EventData>(MAT_DIALOG_DATA);

  ngOnInit() {
    if (this.parentForm && !this.parentForm.contains('genre')) {
      this.parentForm.addControl('genre', this.fb.control('', Validators.required));
      if (this.data && this.data.genre) {
        this.parentForm.patchValue({ genre: this.data.genre });
      }
    }
  }
}
