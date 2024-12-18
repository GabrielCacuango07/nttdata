import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './screens/products/add-product/add-product.component';
import { WelcomeComponent } from './screens/welcome/welcome.component';  // Importa el componente de bienvenida
import { TableComponent } from './components/table/table.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },  // Ruta predeterminada muestra el componente Welcome
  { path: 'new-product', component: AddProductComponent },  // Ruta para "Nuevo Producto"
  { path: 'table', component: TableComponent },  // Ruta para la tabla, por ejemplo
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
