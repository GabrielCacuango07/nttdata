import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {

  productForm: FormGroup = new FormGroup({
    id: new FormControl('', [Validators.required]) ,
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    logo: new FormControl('', [Validators.required]),
    releseDate: new FormControl('', [Validators.required]),
    checkDate: new FormControl('', [Validators.required]), 
  });



  add(){
    console.log("presionado")
  }
  

}

