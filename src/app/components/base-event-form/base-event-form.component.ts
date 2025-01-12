import { Component, inject, OnInit, output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MusicEventFormComponent } from '../music-event-form/music-event-form.component';
import { SportEventFormComponent } from '../sport-event-form/sport-event-form.component';
import { EventData } from '../../shared/interfaces/store';
import { DataStorageService } from '../../core/services/data-storage.service';

@Component({
  selector: 'app-base-event-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MusicEventFormComponent,
    SportEventFormComponent,
  ],
  templateUrl: './base-event-form.component.html',
  styleUrl: './base-event-form.component.scss'
})
export class BaseEventFormComponent implements OnInit {

  public readonly data = inject<EventData>(MAT_DIALOG_DATA);
  public eventForm!: FormGroup;
  public saveEvent = output<boolean>();
  public id!: number;

  private readonly dataStorageService = inject(DataStorageService);

  constructor(private fb: FormBuilder) {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required],
      type: ['', Validators.required],
    });
  }

  ngOnInit() {
    if (this.data) {
      this.eventForm.patchValue({
        title: this.data.title,
        description: this.data.description,
        location: this.data.location,
        type: this.data.type
      });
    } else {
      this.id = Math.round(Math.random() * 1000);
    }
  }

  onSubmit(): void {
    if (this.data) {
      this.dataStorageService.editEvent({...this.eventForm.value, id: this.data.id});
    } else {
      this.dataStorageService.addEvent({...this.eventForm.value, id: this.id});
    }
    this.saveEvent.emit(true);
  }
}
