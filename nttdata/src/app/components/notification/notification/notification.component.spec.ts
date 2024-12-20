import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationComponent } from './notification.component';
import { NotificacionService } from 'src/app/services/notification.service';

describe('NotificationComponent', () => {
  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotificationComponent],
      imports:[],
      providers:[NotificacionService]
    });
    fixture = TestBed.createComponent(NotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should ngOnInit', async() => {
    component.ngOnInit()
    component.notificacionService.showNotification('notificacion')
    expect(component.message).toEqual('notificacion');
    await sleep()
    expect(component.message).toBeNull();
  });
});


function sleep(){
  return new Promise<void>((resolve, reject) => {
    setTimeout(()=>{ 
      resolve()
    },4000)
  })
} 
