import { Injectable, signal, WritableSignal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { pipe } from 'rxjs';

import { EventData } from '../../shared/interfaces/store';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private state!:  WritableSignal<EventData[]>;
  private readonly http = inject(HttpClient);

  constructor() {
    this.http.get<Array<EventData>>('/api')
    .pipe(takeUntilDestroyed())
    .subscribe((value: Array<EventData>) => {
      this.state = signal(value);
    });
  }

  public getData(): WritableSignal<EventData[]> {
    return this.state;
  }

}
