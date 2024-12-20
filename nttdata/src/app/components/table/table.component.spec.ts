import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComponent } from './table.component';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableComponent]
    });
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should click row', () => {
    
    component.canClickRow = true
    component.clickFn = () =>{}
    let rowSpy = jest.spyOn(component,"clickFn");
    component.handleRowClick({})
    expect(rowSpy).toHaveBeenCalledWith({});
  });
  it('should onChanges', () => {    
    let changeSpy = jest.spyOn(component,"updateDisplayedData");
    component.ngOnChanges()
    expect(changeSpy).toHaveBeenCalled();
  });
  it('should get keys', () => {    
    let keys = component.getKeys({id:1,imageSrc:'',name:'',description:''})
    expect(keys).toEqual(["name","description"]);
  });
  it('should items por page change ', () => {    
    let dataSpy = jest.spyOn(component,'updateDisplayedData')
    //component.onItemsPerPageChange(new Event('change'))
    document.querySelector('#itemsPerPage')?.dispatchEvent(new Event('change'))
    expect(dataSpy).toHaveBeenCalled();
  });
});
