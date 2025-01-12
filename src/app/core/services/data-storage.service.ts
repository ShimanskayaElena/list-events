import { Injectable, WritableSignal, Signal, inject } from '@angular/core';
import { EventData } from '../../shared/interfaces/store';

import { HttpService } from './http.service';


@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  public eventsList!: Signal<EventData[]>;

  private state!:  WritableSignal<EventData[]>;
  private readonly httpService = inject(HttpService);

  constructor() {
    this.state = this.httpService.getData();
    this.eventsList = this.state.asReadonly();
   }

  public getEventsList(): Signal<EventData[]> {
    return this.eventsList;
  }

  public addEvent(event: EventData): void {
    this.state.set([...this.state(), event]);
  }

  public deleteEvent(key: number): void {
    this.state.set(this.state().filter(item  => item.id !== key));
  }

  public editEvent(item: EventData): void {
    console.log('editEvent', item);
    this.state.set(this.state().map((event: EventData) => {
      return event.id === item.id ? item : event;
    }));
  }
}
