import { Component, OnInit } from '@angular/core';
import { NotificacionService } from '../../../services/notification.service';

@Component({
  selector: 'app-notificacion',
  template: `
    <div *ngIf="message" class="notification">
      {{ message }}
    </div>
  `,
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  message: string | null = null;

  constructor(public notificacionService: NotificacionService) {}

  ngOnInit() {
    this.notificacionService.notifications$.subscribe((message: string | null) => {
      this.message = message;
      setTimeout(() => {
        this.message = null;
      }, 3000); 
    });
  }
}
