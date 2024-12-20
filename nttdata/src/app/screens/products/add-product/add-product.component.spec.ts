import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductComponent } from './add-product.component';
import { ProductService } from 'src/app/services/product.service';
import { BehaviorSubject, of } from 'rxjs';
import {HttpClientTestingModule } from '@angular/common/http/testing';
import { PrimaryButtonComponent } from 'src/app/components/buttons/primary-button/primary-button.component';
import { TextInputComponent } from 'src/app/components/inputs/text-input/text-input.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DialogsComponent } from 'src/app/components/notification/dialogs/dialogs.component';
import { DateInputComponent } from 'src/app/components/inputs/date-input/date-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from 'src/app/components/common/spiner/spiner.component';

describe('AddProductComponent', () => {
  let component: AddProductComponent;
  let fixture: ComponentFixture<AddProductComponent>;
  let productMockup = {
    "name": "Nombre producto",
    "description": "Descripción producto",
    "logo": "assets-1.png",
    "date_release": "2025-01-01",
    "date_revision": "2025-01-01"
    }
    let productNavegation ={
              id: "1" ,
              name: "name" ,
              description: "description" ,
              logo: "logo" ,
              releaseDate: "releaseDate" ,
              checkDate: "checkDate"
    }
    let paramsSubject: BehaviorSubject<any>;
  let productServiceMockup = {
            saveProduct:jest.fn().mockReturnValue(of({
              "message": "Product added successfully",
              "data":{...productMockup, "id": "dos",} 
             }
             )),
             updateProduct:jest.fn().mockReturnValue(of({
              "message": "Product updated successfully",
              "data":productMockup 
             }
             )),
             deleteProduct:jest.fn().mockReturnValue(of({
                "message": "Product removed successfully"
             }
             )),
             checkProduct:jest.fn().mockReturnValue(of(true)),

  }

  beforeEach(() => {
    paramsSubject = new BehaviorSubject({ });
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,RouterModule,FormsModule,ReactiveFormsModule],
      declarations: [AddProductComponent,PrimaryButtonComponent,TextInputComponent,DialogsComponent,DateInputComponent,SpinnerComponent],
      providers:[{provider:ProductService,
                  useValue:productServiceMockup},
                 {
                   provide: ActivatedRoute, 
                   useValue: { params: paramsSubject.asObservable() }
                 },
                 {
                  provide: Router, 
                  useValue: { getCurrentNavigation:jest.fn().mockReturnValue({extras: {state:{element:productNavegation}}}) }
                },
                
                ]
    });
    fixture = TestBed.createComponent(AddProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }
);
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should dont if  save product form is invalid ', () => {
    let notificationSpy = jest.spyOn(component.notificacionService,"showNotification")
    component.saveProduct()
    expect(notificationSpy).toHaveBeenCalledWith("Producto no válido. Revise los campos.");
  });
  it('should save product form is valid ', () => {
      
        component.productForm.get('id')?.setValue("1111111");
        component.productForm.get('name')?.setValue("Nombre producto");
        component.productForm.get('description')?.setValue("Descripción producto");
        component.productForm.get('logo')?.setValue("assets-1.png");
        component.productForm.get('checkDate')?.setValue("2025-01-01");
        component.productForm.get('releaseDate')?.setValue("2025-01-01");
  
    let createSpy = jest.spyOn(component.productService,"saveProduct")
    component.saveProduct()
    expect(createSpy).toHaveBeenCalledWith({"date_release": "2025-01-01", "date_revision": "2026-01-01", "description": "Descripción producto", "id": "1111111", "logo": "assets-1.png", "name": "Nombre producto"});
  });

  it('should dont if update product form is invalid ', () => {
    let notificationSpy = jest.spyOn(component.notificacionService,"showNotification")
    component.productForm.get('releaseDate')?.setValue("2025-01-01");
    component.updateProduct()
    expect(notificationSpy).toHaveBeenCalledWith("Producto no válido. Revise los campos.");
  });
  it('should update product form is valid ', () => {
      
    component.productForm.get('id')?.setValue("1111111");
    component.productForm.get('name')?.setValue("Nombre producto");
    component.productForm.get('description')?.setValue("Descripción producto");
    component.productForm.get('logo')?.setValue("assets-1.png");
    component.productForm.get('checkDate')?.setValue("2025-01-01");
    component.productForm.get('releaseDate')?.setValue("2025-01-01");

let updateSpy = jest.spyOn(component.productService,"updateProduct")
component.updateProduct()
expect(updateSpy).toHaveBeenCalledWith({"date_release": "2025-01-01", "date_revision": "2026-01-01", "description": "Descripción producto", "id": "1111111", "logo": "assets-1.png", "name": "Nombre producto"});
});

it('should open dialog ', () => {
  component.openDialog();
  expect(component.isDialogVisible).toBeTruthy();
});
it('should cloase dialog ', () => {
  component.closeDialog();
  expect(component.isDialogVisible).toBeFalsy();
});

it('should confirm dialog ', () => {
  let deleteSpy = jest.spyOn(component.productService,"deleteProduct")
  component.productForm.get('id')?.setValue("1111111");
  component.onConfirm();
  expect(deleteSpy).toHaveBeenCalledWith("1111111");
});
it('should clear form edit case ', () => {
  component.edit = false;
  let patchValueSpy = jest.spyOn(component.productForm,"patchValue")
  component.clearForm()
  expect(patchValueSpy).toHaveBeenCalledWith({
    name: '',
    description: '',
    logo: '',
    releaseDate: '',
    checkDate: ''
  });
});
it('should clear form not edit case ', () => {
  component.edit = true;
  let resetValueSpy = jest.spyOn(component.productForm,"reset")
  component.clearForm()
  expect(resetValueSpy).toHaveBeenCalled();
});
});
