import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { HeaderComponent } from './components/common/header/header.component';
import { NotificationComponent } from './components/notification/notification/notification.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [AppComponent,FooterComponent,HeaderComponent,NotificationComponent],
    imports:[RouterTestingModule]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'nttdata'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('nttdata');
  });
  it('should add item', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    let routeSpy = jest.spyOn(component.router,'navigate')
    component.addItem()
    expect(routeSpy).toHaveBeenCalledWith(['/new-product']);
  });

});
