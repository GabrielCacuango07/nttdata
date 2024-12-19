import { ChangeDetectorRef, Component, Input } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  @Input() headers: { title: string, icon?: string }[] = [];
  @Input() data: { [key: string]: any }[] = [];
  @Input() canClickRow: boolean = false;
  @Input() clickFn: (element: any) => void = (element) => null;

  constructor(
    private cd: ChangeDetectorRef,
  ) { }
  itemsPerPage = 20;
  currentPage = 1; 
  displayedData: { [key: string]: any }[] = []; 


  ngOnInit(): void {

    console.log(this.clickFn,"jjjj")
    this.cd.detectChanges();
  }
  ngOnChanges(): void {
    this.updateDisplayedData();
  }

  handleRowClick(row: any): void {
    if (this.canClickRow && this.clickFn) {
      this.clickFn(row);
    }
  }

  getKeys(row: { [key: string]: any }): string[] {
    return Object.keys(row).filter((key) => key !== 'id'); 
  }

  updateDisplayedData(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedData = this.data.slice(startIndex, endIndex);
  }

  onItemsPerPageChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.itemsPerPage = parseInt(value, 10);
    this.currentPage = 1; 
    this.updateDisplayedData();
  }
}
