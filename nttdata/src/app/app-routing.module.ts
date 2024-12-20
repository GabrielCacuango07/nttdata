import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './screens/products/add-product/add-product.component';
import { WelcomeComponent } from './screens/welcome/welcome.component';  
import { TableComponent } from './components/table/table.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },  
  { path: 'new-product', component: AddProductComponent },  
  { path: 'table', component: TableComponent },  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
