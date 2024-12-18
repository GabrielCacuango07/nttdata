import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './screens/welcome/welcome.component';
import { TableComponent } from './components/table/table.component';
import { HeaderComponent } from './components/common/header/header.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { SearchComponent } from './components/common/search/search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimaryButtonComponent } from './components/buttons/primary-button/primary-button.component';
import { AddProductComponent } from './screens/products/add-product/add-product.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { TextInputComponent } from './components/inputs/text-input/text-input.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    TableComponent,
    HeaderComponent,
    FooterComponent,
    SearchComponent,
    PrimaryButtonComponent,
    AddProductComponent,
    TextInputComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
