import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'nttdata';
  tableHeaders = [
    { title: 'Logo',},
    { title: 'Nombre' },
    { title: 'Edad', icon:    '../assets/icons/icon_info.png' },
    { title: 'Nombre', icon: '../assets/icons/icon_info.png', tooltip: 'Ordenar por nombre' },
  { title: 'Edad', tooltip: 'Ordenar por edad' },
  { title: 'Log', icon: '../assets/icons/icon_info.png', tooltip: 'Registro de actividad' }
  ];

  tableData = [
    { log: '../assets/icons/image_logo_default.png' ,nombre: 'Juan', edad: 25 , test:"gabriel",valor:0.5,cantidad:100},
    { log: ' ../assets/icons/image_logo_default.png',nombre: 'Ana', edad: 30 , test:"gabriel",valor:0.5,cantidad:100 }
  ];

  constructor(
    private router: Router,
  ) {
  }

  addItem() {
    console.log("presionado");  // Verifica que se imprima en la consola
    this.router.navigate(['/new-product']);  // Esto redirige a la ruta /new-product
  }


  handleSearch(term: string): void {
    console.log('Término de búsqueda:', term);
    // Implementa aquí la lógica para filtrar datos o realizar la búsqueda
  }
 
}


