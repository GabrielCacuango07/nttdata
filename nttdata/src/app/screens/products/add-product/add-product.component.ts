import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NttValidators } from 'src/app/utils/forms-validators.utils';
import { NotificacionService } from 'src/app/services/notification.service';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {

  private notificationSubscription: Subscription | undefined;
  element: any = {};
  loading: boolean = false;
  edit:    boolean=true;

  productForm: FormGroup = new FormGroup({
    id: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
    name: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
    description: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]),
    logo: new FormControl('', [Validators.required]),
    releaseDate: new FormControl('', [Validators.required]),
    checkDate: new FormControl('', [Validators.required, NttValidators.minDateValidator(new Date())]),
  });

  constructor(
    private notificacionService: NotificacionService,
    private productService: ProductService,
    private router: Router
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.element = navigation?.extras.state?.['element'] || null;
    console.log('elemento recibido:', this.element);

    if (this.element != null) {
      this.edit = false
      this.loading = true;
      this.productService.checkProduct(this.element.id).subscribe({
        next: (response: any) => {
          console.log("Datos recibidos del producto:", response);
          if (response) {
           
            this.productForm.patchValue({
              id: this.element.id || 'Valor predeterminado',
              name: this.element.name || 'Valor predeterminado',
              description: this.element.description || 'Valor predeterminado',
              logo: this.element.logo || 'Valor predeterminado',
              releaseDate: this.element.releaseDate || '2025-01-01',
              checkDate: this.element.checkDate || '2025-01-01',
            });
          } else {
            this.notificacionService.showNotification('No existe el producto');
          }
          this.loading = false;
        },
        error: (err) => {
          console.error("Error al cargar el producto:", err);
          this.notificacionService.showNotification('Error al cargar el producto');
          this.loading = false;
        }
      });
    }
  }

  ngOnInit() {
   
    this.notificationSubscription = this.notificacionService.notifications$.subscribe(
      (message: string) => {
        //alert(message); 
      }
    );
  }

  ngOnDestroy() {
    
    if (this.notificationSubscription) {
      this.notificationSubscription.unsubscribe();
    }
  }

  saveProduct() {
    console.log("Se presiona el botón de guardar");
    this.loading = true;
    if (!this.productForm.valid) {
      this.notificacionService.showNotification('Producto no válido. Revise los campos.');
      this.loading = false;
      return;
    }

    const data = this.productForm.value;

    this.productService.saveProduct(data).subscribe({
      next: (response: any) => {
        if (response.correct) {
          this.notificacionService.showNotification('Producto guardado correctamente');
        } else {
          this.notificacionService.showNotification('Error al actualizar el producto');
        }
        this.loading = false;
      },
      error: (err) => {
        console.error("Error al guardar el producto:", err);
        this.notificacionService.showNotification('Error al guardar el producto');
        this.loading = false;
      }
    });
  }
  updateProduct(){
    let data = this.prepareData(this.productForm.value);
    this.productService.updateProduct(data).subscribe({
      next: (response: any) => {
        console.log("🚀 ~ AddProductComponent ~ this.productService.updateProduct ~ response:", response.message)
        if (response.message =='Product updated successfully') {
          console.log("heeeeee")
          this.notificacionService.showNotification('Producto guardado correctamente');
          this.router.navigate(['/']);          
        } else {
          this.notificacionService.showNotification('Error al actualizar el producto');
        }
        this.loading = false;
      },
      error: (err) => {
        console.error("Error al guardar el producto:", err);
        this.notificacionService.showNotification('Error al guardar el producto');
        this.loading = false;
      }
    });
    console.log("updateProduct")
  }

  prepareData(data:any){
    let dataUpdate = {
      id:data.id,
      name: data.name,
      description: data.description,
      logo: data.logo,
      date_release: data.releaseDate,
      date_revision: data.checkDate
    }
    return dataUpdate
  }
}
