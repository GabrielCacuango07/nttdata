import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogsComponent } from './dialogs.component';

describe('DialogsComponent', () => {
  let component: DialogsComponent;
  let fixture: ComponentFixture<DialogsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogsComponent]
    });
    fixture = TestBed.createComponent(DialogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should onClose', () => {
    let onClose = jest.spyOn(component.close,"emit")
    component.onClose()
    expect(onClose).toHaveBeenCalled();
  });
  it('should confirm', () => {
    let onConfirm = jest.spyOn(component.confirmAction,"emit")
    component.confirm()
    expect(onConfirm).toHaveBeenCalled();
  });
});
