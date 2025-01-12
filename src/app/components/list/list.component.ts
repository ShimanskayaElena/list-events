import { Component, inject, Signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { DataStorageService } from '../../core/services/data-storage.service';
import { EventData } from '../../shared/interfaces/store';
import { DialogComponent } from '../dialog/dialog.component';


@Component({
  selector: 'app-list',
  imports: [
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
   ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {

  public eventsList!: Signal<EventData[]>;
  public displayedColumns: string[] = ['id', 'title', 'description', 'location', 'type', 'buttons' ];

  private readonly dialog = inject(MatDialog);
  private readonly dataStorageService = inject(DataStorageService);

  constructor() {
    this.eventsList = this.dataStorageService.getEventsList();
  }

  public onDeleteEvent(event: Event, item: EventData): void {
    event.preventDefault();
    this.dataStorageService.deleteEvent(item.id);
  }

  public onEditEvent(event: Event, item: EventData): void {
    event.preventDefault();
    const data: EventData = item;
    this.dialog.open(DialogComponent,
      {
        data: data,
        height: '100%',
        width: '50%',
      });
  }

  public onAddEvent(event: Event): void {
    event.preventDefault();
    this.dialog.open(DialogComponent, { height: '100%', width: '50%' });
  }

}
