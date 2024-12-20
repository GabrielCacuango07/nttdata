import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeComponent } from './welcome.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductService } from 'src/app/services/product.service';
import { BehaviorSubject, of } from 'rxjs';
import { PrimaryButtonComponent } from 'src/app/components/buttons/primary-button/primary-button.component';
import { SearchComponent } from 'src/app/components/common/search/search.component';
import { TableComponent } from 'src/app/components/table/table.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;
  let paramsSubject: BehaviorSubject<any>;
let productsMockup = [
  {
  "id": "uno",
  "name": "Nombre producto",
  "description": "Descripción producto",
  "logo": "assets-1.png",
  "releaseDate": "2025-01-01",
  "checkDate": "2025-01-01"
  },
  {
    "id": "dos",
    "name": "Nombre dos  ",
    "description": "Descripción dos",
    "logo": "assets-1.png",
    "releaseDate": "2025-01-01",
    "checkDate": "2025-01-01"
    }
  ]
  let productServiceMockup = {
              getProducts:jest.fn().mockReturnValue(of({
                "data":[
                  {
                  "id": "uno",
                  "name": "Nombre producto",
                  "description": "Descripción producto",
                  "logo": "assets-1.png",
                  "date_release": "2025-01-01",
                  "date_revision": "2025-01-01"
                  },
                  {
                    "id": "dos",
                    "name": "Nombre dos  ",
                    "description": "Descripción dos",
                    "logo": "assets-1.png",
                    "date_release": "2025-01-01",
                    "date_revision": "2025-01-01"
                    }
                  ] 
               }               
               ))
  
    }

  beforeEach(() => {
    paramsSubject = new BehaviorSubject({ });
    TestBed.configureTestingModule({
      declarations: [WelcomeComponent,PrimaryButtonComponent,SearchComponent,TableComponent],
      imports:[HttpClientTestingModule,RouterModule,FormsModule,ReactiveFormsModule,RouterTestingModule],
      providers:[{provider:ProductService,
        useValue:productServiceMockup},
      {
                         provide: ActivatedRoute, 
                         useValue: { params: paramsSubject.asObservable() }
                       },]
    });
    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should click row', () => {
    let routerSpy = jest.spyOn(component.router,"navigate");
    component.onRowClick({})
    expect(routerSpy).toHaveBeenCalledWith(['/new-product'],{ state: { element: {} } });
  });
  it('should show filter', () => {
    component.tableData = productsMockup
    component.handleSearch('');
    expect(component.filteredData).toEqual(component.tableData);
  });
  it('should whith term show filter', () => {
    component.tableData = productsMockup
    component.handleSearch('dos');
    expect(component.filteredData).toEqual([{
      "id": "dos",
      "name": "Nombre dos  ",
      "description": "Descripción dos",
      "logo": "assets-1.png",
      "releaseDate": "2025-01-01",
      "checkDate": "2025-01-01"
      }]);
  });
   it('should add item', () => {
      let routeSpy = jest.spyOn(component.router,'navigate')
      component.addItem()
      expect(routeSpy).toHaveBeenCalledWith(['/new-product']);
    });
});
