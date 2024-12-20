import { ChangeDetectorRef, Component, Input } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent {
  @Input() headers: { title: string; icon?: string }[] = [];
  @Input() data: { [key: string]: any }[] = [];
  @Input() canClickRow: boolean = false;
  @Input() clickFn: (element: any) => void = (element) => null;

  imageSrc: string = '../../../assets/icons/icono_banco.png'; // Ruta de la imagen por defecto

  constructor(private cd: ChangeDetectorRef) {}
  itemsPerPage = 20;
  currentPage = 1;
  displayedData: { [key: string]: any }[] = [];

  ngOnInit(): void {
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
    return Object.keys(row).filter((key) => key !== 'id' && key !== 'imageSrc'); // Aseguramos que 'imageSrc' no se incluya
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
  onImageError(event: any, row: any): void {
    row.src = '../../../assets/icons/icono_banco.png';
  }
}
