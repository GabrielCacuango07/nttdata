import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent {
  title = 'nttdata';
  filteredData: Product[] = [];
  tableHeaders = [
    { title: 'Logo' },
    { title: 'Nombre del producto' },
    { title: 'Descripción', icon: '../assets/icons/icon_info.png' },
    {
      title: 'Fecha de liberación',
      icon: '../assets/icons/icon_info.png',
      tooltip: 'Ordenar por nombre',
    },
    { title: 'Fecha de revisión', tooltip: 'Ordenar por edad' },
  ];

  tableData: Product[] = [];

  constructor(public router: Router, private productService: ProductService) {
    this.getProducts();
  }

  getProducts() {
    this.fetchProducts(this.productService.getProducts());
  }

  addItem() {
    this.router.navigate(['/new-product']);
  }
  onRowClick(row: any): void {
    this.router.navigate(['/new-product'], { state: { element: row } });
  }

  private fetchProducts(consentObservable: Observable<any>) {
    consentObservable.subscribe({
      next: (resp: any) => {
        if (resp.data) {
          if (Array.isArray(resp.data) && resp.data.length > 0) {
            this.tableData = resp.data.map((product: any): Product => {
              return {
                logo: product.logo,
                name: product.name,
                description: product.description,
                releaseDate: product.date_release,
                checkDate: product.date_revision,
                id: product.id,
              };
            });
            this.filteredData = [...this.tableData];
          } else {
            console.warn('La data está vacía');
            this.tableData = [];
            this.filteredData = [];
          }
        } else {
          console.error(
            'Error en la respuesta del servidor:',
            resp?.message || 'Respuesta no válida'
          );
          this.tableData = [];
          this.filteredData = [];
        }
      },
    });
  }

  handleSearch(term: string): void {
    if (term.trim() === '') {
      this.filteredData = [...this.tableData];
    } else {
      const lowerCaseTerm = term.toLowerCase();
      this.filteredData = this.tableData.filter(
        (product: Product) =>
          product.name.toLowerCase().includes(lowerCaseTerm) ||
          product.description.toLowerCase().includes(lowerCaseTerm)
      );
    }
  }
}

interface Product {
  logo: string;
  name: string;
  description: string;
  releaseDate: string;
  checkDate: string;
  id: string;
}
