import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
    title = 'nttdata';
    tableHeaders = [
      { title: 'Logo',},
      { title: 'Nombre del producto' },
      { title: 'Descripción', icon:    '../assets/icons/icon_info.png' },
      { title: 'Fecha de liberación', icon: '../assets/icons/icon_info.png', tooltip: 'Ordenar por nombre' },
    { title: 'Fecha de revisión', tooltip: 'Ordenar por edad' },
    ];
  
    tableData = [];
  
    constructor(
      private router: Router,
      private productService: ProductService
    ) {

      this.getProducts();

    }

    getProducts(){
      this.fetchProducts(this.productService.getProducts())
    }
  
    addItem() {
      console.log("presionado"); 
      this.router.navigate(['/new-product']); 
    }
  
  
    handleSearch(term: string): void {
      console.log('Término de búsqueda:', term);
     
    }
    onRowClick(row: any): void {
      console.log('Fila clickeada:', row);
      this.router.navigate(['/new-product'], { state: { element: row } });
    }
    private fetchProducts(consentObservable: Observable<any>) {
      consentObservable.subscribe({
        next: (resp: any) => {
          console.log("🚀 ~ WelcomeComponent ~ fetchProducts ~ resp:", resp);
      
          if (resp.data) {
              console.log("🚀 ~ WelcomeComponent ~ fetchProducts ~ resp.data:", resp.data)
              if (Array.isArray(resp.data) && resp.data.length > 0) {
                  this.tableData = resp.data.map((product: any) => {
                      return {
                        logo: product.logo,  
                        name: product.name,  
                        description: product.description,  
                        releaseDate: product.date_release,  
                        checkDate: product.date_revision,
                        id:product.id
                      };
                  });
              } else {
                  console.warn("La data está vacía");
                  this.tableData = []; 
              }
          } else {
              console.error("Error en la respuesta del servidor:", resp?.message || "Respuesta no válida");
              this.tableData = []; 
          }
      }
      });
  }

}
