import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateInputComponent } from './date-input.component';

describe('DateInputComponent', () => {
  let component: DateInputComponent;
  let fixture: ComponentFixture<DateInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DateInputComponent]
    });
    fixture = TestBed.createComponent(DateInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should write value ', () => {
    component.writeValue('111');

    expect(component.value).toEqual('111');
  });
  it('should register onChange  ', () => {
    let fn = ()=>{}
    component.registerOnChange(fn);
    expect(component.onChange).toEqual(fn);
  });
  it('should  ontouch  ', () => {
    let fn = ()=>{}
    component.registerOnTouched(fn);
    expect(component.onTouched ).toEqual(fn);
  });
  it('should  setDisable  ', () => {
    let disable = true;
    component.setDisabledState!(disable)
    expect(component.edit).toBeFalsy();
  });

  



});
