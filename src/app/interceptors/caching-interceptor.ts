import { HttpRequest, HttpHandlerFn, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { events } from '../../../public/data-events';
import { EventData } from '../shared/interfaces/store';

export function cachingInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpResponse<EventData[]>> {

  const resp = new HttpResponse<EventData[]>({
    body: events
  });

  return of(resp);
}
