import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimaryButtonComponent } from './primary-button.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('PrimaryButtonComponent', () => {
  let component: PrimaryButtonComponent;
  let fixture: ComponentFixture<PrimaryButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrimaryButtonComponent],
      imports:[RouterTestingModule],
      providers:[]
    });
    fixture = TestBed.createComponent(PrimaryButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

    it('should onClick', () => {
    component.navigateTo = ["hello"]
    component.enabled = true;
    let routeSpy = jest.spyOn(component.router,'navigate')
    component.onClick()
    expect(routeSpy).toHaveBeenCalledWith(["hello"]);
  });
});
