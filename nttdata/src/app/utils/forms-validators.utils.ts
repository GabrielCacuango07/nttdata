
import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";

import { Observable, catchError, map, of,tap } from "rxjs";
import { ProductService } from "../services/product.service";



export const NttValidators: any = {

  idExist(productService: ProductService): AsyncValidatorFn {
    return (control: AbstractControl) => {
      if (!control.value) {
        return of(null); 
      }
      return productService.checkProduct(control.value).pipe(
        map((response: any) => {
          return response ? { idExists: true } : null; 
        }),
        catchError(() => of(null)) 
      );
    };
  },
  minDateValidator(minDate: Date): (control: AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      
      const inputDate = new Date(control.value);
      const today = new Date(minDate);
  
     
      if (!control.value) {
        return null;
      }
  
      
      if (inputDate < today) {
        return { minDate: true }
      }
      return null;
    };
  },
    
    isRequired: (): ValidatorFn => Validators.required,
    maxLength: (length: number): ValidatorFn => Validators.maxLength(length),
    minLength: (length: number): ValidatorFn => Validators.minLength(length),
   
    
    }


export function parseError(error: any): string{
  if(error.hasOwnProperty('required')) return 'Este campo es obligatorio';
  if(error.hasOwnProperty('minlength')) return `Ingrese por lo menos ${error.minlength.requiredLength} caracteres`;
  if(error.hasOwnProperty('maxlength')) return `Ingrese máximo ${error.maxlength.requiredLength} caracteres`;
  if(error.hasOwnProperty('minDate')) return `Ingrese una fecha mayor  a la actual`;
  if(error.hasOwnProperty('idExists')) return `Ingrese otro id`;
  return 'Por favor, ingrese un valor válido';
}




