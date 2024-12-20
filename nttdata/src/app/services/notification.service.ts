import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {
  private notificationSubject = new Subject<string>();

  get notifications$() {
    return this.notificationSubject.asObservable();
  }

  showNotification(message: string) {
    this.notificationSubject.next(message);
  }
}
