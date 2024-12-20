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
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent {
  element: any = {};
  loading: boolean = false;
  edit: boolean = true;
  isDialogVisible: boolean = false;

  productForm: FormGroup = new FormGroup({
    id: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10),
      ],
      asyncValidators: [NttValidators.idExist(this.productService)],
      updateOn: 'blur',
    }),
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(100),
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(200),
    ]),
    logo: new FormControl('', [Validators.required]),
    releaseDate: new FormControl('', [
      Validators.required,
      NttValidators.minDateValidator(new Date()),
    ]),
    checkDate: new FormControl('', [
      Validators.required,
      NttValidators.minDateValidator(new Date()),
    ]),
  });

  constructor(
    public notificacionService: NotificacionService,
    public productService: ProductService,
    public router: Router
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.element = navigation?.extras.state?.['element'] || null;
    if (this.element != null) {
      this.productForm.get('id')?.disable();
      this.edit = false;
      this.loading = true;
      this.productService.checkProduct(this.element.id).subscribe({
        next: (response: any) => {
          if (response) {
            this.productForm.patchValue({
              id: this.element.id,
              name: this.element.name,
              description: this.element.description,
              logo: this.element.logo,
              releaseDate: this.element.releaseDate,
              checkDate: this.element.checkDate,
            });
          } else {
            this.notificacionService.showNotification('No existe el producto');
          }
          this.loading = false;
        },
        error: (err) => {
          this.notificacionService.showNotification(
            'Error al cargar el producto'
          );
          this.loading = false;
        },
      });
    }
  }

  ngOnInit() {
    this.productForm.get('checkDate')?.disable();

    this.productForm
      .get('releaseDate')
      ?.valueChanges.subscribe((releaseDate: string) => {
        if (releaseDate) {
          const newCheckDate = new Date(releaseDate);
          newCheckDate.setFullYear(newCheckDate.getFullYear() + 1);
          const isoDateString = newCheckDate.toISOString().split('T')[0];
          this.productForm.get('checkDate')?.setValue(isoDateString);
        }
      });
  }

  saveProduct() {
    this.loading = true;
    if (!this.productForm.valid) {
      this.markAllAsTouched();
      this.notificacionService.showNotification(
        'Producto no válido. Revise los campos.'
      );
      this.loading = false;

      return;
    }

    const data = this.prepareData(this.productForm.value);

    this.productService.saveProduct(data).subscribe({
      next: (response: any) => {
        if (response.message == 'Product added successfully') {
          this.notificacionService.showNotification(
            'Producto guardado correctamente'
          );
          this.router.navigate(['/']);
        } else {
          this.notificacionService.showNotification(
            'Error al actualizar el producto'
          );
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al guardar el producto:', err);
        this.notificacionService.showNotification(
          'Error al guardar el producto'
        );
        this.loading = false;
      },
    });
  }
  updateProduct() {
    let data = this.prepareData(this.productForm.value);
    this.loading = true;
    if (!this.productForm.valid) {
      this.markAllAsTouched();
      this.notificacionService.showNotification(
        'Producto no válido. Revise los campos.'
      );
      this.loading = false;
      return;
    }
    this.productService.updateProduct(data).subscribe({
      next: (response: any) => {
        if (response.message == 'Product updated successfully') {
          this.notificacionService.showNotification(
            'Producto guardado correctamente'
          );
          this.router.navigate(['/']);
        } else {
          this.notificacionService.showNotification(
            'Error al actualizar el producto'
          );
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al guardar el producto:', err);
        this.notificacionService.showNotification(
          'Error al guardar el producto'
        );
        this.loading = false;
      },
    });
  }

  clearForm() {
    if (!this.edit) {
      this.productForm.patchValue({
        name: '',
        description: '',
        logo: '',
        releaseDate: '',
        checkDate: '',
      });
    } else {
      this.productForm.reset();
    }
  }

  openDialog() {
    this.isDialogVisible = true;
  }

  closeDialog() {
    this.isDialogVisible = false;
  }

  onConfirm() {
    let data = this.productForm.get('id')?.value;
    this.productService.deleteProduct(data).subscribe({
      next: (response: any) => {
        if (response.message == 'Product removed successfully') {
          this.notificacionService.showNotification(
            'Producto eliminado correctamente'
          );
          this.router.navigate(['/']);
        } else {
          this.notificacionService.showNotification(
            'Error al eliminar el producto'
          );
        }
        this.loading = false;
      },
      error: (err) => {
        this.notificacionService.showNotification(
          'Error al guardar el producto'
        );
        this.loading = false;
      },
    });

    this.closeDialog();
  }
  markAllAsTouched() {
    Object.keys(this.productForm.controls).forEach((field) => {
      const control = this.productForm.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }
  prepareData(data: any) {
    const newCheckDate = new Date(data.releaseDate);
    newCheckDate.setFullYear(newCheckDate.getFullYear() + 1);
    const isoDateString = newCheckDate.toISOString().split('T')[0];
    this.productForm.get('checkDate')?.setValue(isoDateString);
    let dataUpdate = {
      id: this.productForm.get('id')?.value,
      name: data.name,
      description: data.description,
      logo: data.logo,
      date_release: data.releaseDate,
      date_revision: isoDateString,
    };
    return dataUpdate;
  }
}
