
import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";

import { Observable, catchError, map, of,tap } from "rxjs";
import { ProductService } from "../services/product.service";



export const NttValidators: any = {

  idExist(productService: ProductService): AsyncValidatorFn {
    return (control: AbstractControl) => {
      if (!control.value) {
        return of(null); // Si el campo está vacío, no valida como error
      }
      return productService.checkProduct(control.value).pipe(
        map((response: any) => {
          return response ? { idExists: true } : null; // Si el ID existe, devuelve un error
        }),
        catchError(() => of(null)) // Si hay un error en la llamada, no bloquea el formulario
      );
    };
  },

  minDateValidator(minDate: Date): (control: AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      
      console.log("🚀 ~ return ~ control:", control)
      const inputDate = new Date(control.value);
      const today = new Date(minDate);
  
     
      if (!control.value) {
        return null;
      }
  
      console.log("🚀 ~ return ~ inputDate:", inputDate)
      console.log("🚀 ~ return ~ today:", today)
      
      if (inputDate < today) {
        return { minDate: true }
      }
      return null;
    };
  },

  names(): ValidatorFn {
   return (control: AbstractControl): ValidationErrors | null => {
      if(control && (!control.value?.trim() || (control?.value?.match(/^[A-Za-z\u00C0-\u017F\s]+$/)))) {
        return null
      }
      return { names: true };

    };
},
    phone: (): ValidatorFn => (control: AbstractControl): ValidationErrors | null => {
        let value = control.value?.toString();
        if(!value || !value.match(/[^0-9+]/g))
        return null;
        return {phone: true};
    },
    url:(): ValidatorFn => (control: AbstractControl): ValidationErrors | null => {
      const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
      if (!control.value || urlPattern.test(control.value)) {
      return null; 
     }
     return { uri: true }; 
    },
    nonNegativeNumber: (): ValidatorFn => (control: AbstractControl): ValidationErrors | null => {
        let value = control.value;

        if (
            value &&
            typeof value === 'number' &&
            value >= 0
        ) return null; // El número es no negativo y no contiene un punto entre dígitos

        return { negative: true };
    },
    isInteger: (): ValidatorFn => (control: AbstractControl): ValidationErrors | null => {
        let value = control.value;
        if(value && /^[1-9]\d*$/.test(value.toString())) return null;

        return { decimal: true };
    },
    isPassword: (): ValidatorFn => (control: AbstractControl): ValidationErrors | null => {
        let value = control.value;

        if(!value || value.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,15}$/gm)) return null;
        return { noValidPass: true };
    },
    CommaDecimalVal: (): ValidatorFn => (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null;
      }
      const pattern = /^[0-9]+(\.[0-9]{2})?$/;
      console.log("🚀 ~ file: custom-validators.ts:14 ~ return ~ value:", value)

      let valor = formatNumberWithTwoDecimals(value);
      console.log("🚀 ~ file: custom-validators.ts:18 ~ return ~ valor:", valor)

      const isValid = pattern.test(valor);
      console.log("🚀 ~ file: custom-validators.ts:15 ~ return ~ isValid:", isValid)

      return isValid ? null : { commaDecimal: true };
    },
    onlyOneDni(elasticSearchService: any, isEditMode: boolean): AsyncValidatorFn {
      return (control: AbstractControl): Observable<ValidationErrors | null> => {
          // Si estamos en modo edición, no se realiza la validación
          if (!isEditMode) {
              return of(null); // No hay error
          }
  
          const value = control.value;
          if (!value) {
              return of(null); // Si no hay valor, no hay error
          }
  
          // Convertir el valor a minúsculas y eliminar espacios
          let filterValue = value.toLowerCase().trim();
  
          // Buscamos en el servicio
          return elasticSearchService.searchPatient(filterValue).pipe(
              map((response: any) => {
                  if (response.correct && response.answer.length > 0) {
                    const dniExists = response.answer.some((item: { _source: { dni: string | number; }; }) => 
                      String(item._source.dni).trim().toLowerCase() === String(value).trim().toLowerCase()
                  );          
                      if (dniExists) {
                          console.log(`El DNI ${value} existe en la lista.`);
                          return { dniNotFound: true }; // Error: DNI ya existe
                      } else {
                          console.log(`El DNI ${value} no existe en la lista.`);
                          return null; // No hay error
                      }
                  } else {
                      return null; // No hay error
                  }
              }),
              catchError(() => of(null)) // Si hay un error, es válido
          );
      };
  },  
     
    
    isRequired: (): ValidatorFn => Validators.required,
    maxLength: (length: number): ValidatorFn => Validators.maxLength(length),
    minLength: (length: number): ValidatorFn => Validators.minLength(length),
    cedulaEcValidator(): ValidatorFn {
      return (control: AbstractControl): ValidationErrors | null => {
        const ci = control.value.toString(); // Convertir a string
    
        let isNumeric = true;
        let total = 0;
        let individual: string;
    
        for (let position = 0; position < 10; position++) {
          individual = ci.substring(position, position + 1);
    
          if (isNaN(parseInt(individual))) {
            isNumeric = false;
            break;
          } else {
            if (position < 9) {
              if (position % 2 === 0) {
                const double = parseInt(individual) * 2;
                if (double > 9) {
                  total += 1 + (double % 10);
                } else {
                  total += double;
                }
              } else {
                total += parseInt(individual);
              }
            }
          }
        }
    
        if (total % 10 !== 0) {
          total = (total - (total % 10) + 10) - total;
        } else {
          total = 0;
        }
    
        // Verifica condiciones
        if (isNumeric) {
          if (ci.length !== 10 || parseInt(ci, 10) === 0 || total !== parseInt(ci.substring(9))) {
            return { invalidCI: true }; // Cédula no válida
          }
          return null; // Cédula válida
        }
    
        return { invalidCI: true }; 
      };
    },
    dniEsValidator(): ValidatorFn {
      return (control: AbstractControl): ValidationErrors | null => {
        const inputValue = control.value?.toString().trim().toUpperCase();

        // Validar el DNI (8 dígitos + 1 letra)
        if (inputValue && inputValue.length === 9) {
            const dniPart = inputValue.substring(0, 8);
            const letterPart = inputValue.charAt(8).toUpperCase();

            // Comprobar que la parte numérica es válida
            if (/^\d{8}$/.test(dniPart)) {
                const validLetters = 'TRWAGMYFPDXBNJZSQVHLCKE';
                const number = parseInt(dniPart, 10);
                const calculatedLetter = validLetters.charAt(number % 23);

                // Comprobar si la letra es válida
                if (calculatedLetter === letterPart) {
                    return null; // DNI válido
                }
            }
        }
        // Validar el NIE (una letra [X, Y, Z] + 7 dígitos + 1 letra)
        if (inputValue && /^[XYZ]\d{7}[A-Z]$/.test(inputValue)) {
            const niePrefix = inputValue.charAt(0);
            const numberPart = inputValue.substring(1, 8);
            const letterPart = inputValue.charAt(8).toUpperCase();
            // Calcular el número equivalente para el NIE
            let nieCalculation: number;
            switch (niePrefix) {
                case 'X':
                    nieCalculation = parseInt(numberPart, 10);
                    break;
                case 'Y':
                    nieCalculation = parseInt(numberPart, 10) + 10000000;
                    break;
                case 'Z':
                    nieCalculation = parseInt(numberPart, 10) + 20000000;
                    break;
                default:
                    return { invalidDNIOrNIE: true }; // Prefijo inválido
            }
            // Calcular la letra correspondiente para el NIE
            const validLettersNIE = 'TRWAGMYFPDXBNJZSQVHLCKE';
            const calculatedLetterNIE = validLettersNIE.charAt(nieCalculation % 23);
            // Comprobar si la letra es válida
            if (calculatedLetterNIE === letterPart) {
                return null; // NIE válido
            }
        }
        return { invalidDNIOrNIE: true }; // DNI/NIE inválido
    };
    }
    }
    
    
function formatNumberWithTwoDecimals(num: { toString: () => any; }) {
  const numStr = num.toString();

  if (numStr.includes('.')) {
    const [beforeDecimal, afterDecimal] = numStr.split('.');

    if (afterDecimal.length === 1) {
      return `${beforeDecimal}.${afterDecimal}0`;
    } else if (afterDecimal.length === 0) {
      return `${beforeDecimal}.00`;
    } else {
      return numStr; // Ya tiene dos dígitos decimales
    }
  } else {
    return `${numStr}.00`; // Agregar ".00" si no tiene punto decimal
  }
}

export const validateDynamicForm = (form: any): boolean => {
    for(let i = 0; i < form.forms_data.length; i++){
        let formItem: any = form.forms_data[i];
        for(let j = 0; j < formItem.pages.length; j++){
          let page = formItem.pages[j];
          for(let k = 0; k < page.length; k++){
            let question = page[k];
            let isRequired = question.attributes.includes('required');
            let dependencyStatement = question.attributes.find((attr: any) => attr.includes('visibleIf:'));

            if(dependencyStatement){
                dependencyStatement = dependencyStatement.replace('visibleIf:','').trim();
                let [questionRefID, value] = dependencyStatement.split('==');
                let questionRef = page.find((quest: any) => quest.id == questionRefID);
                if(!questionRef?.answers || (questionRef?.answers != value && questionRef?.answers != value)) continue;
            }

            if(
                isRequired &&
                (
                  question.answers === undefined || question.answers === null ||
                  (question.type != 'Checkbox' && question.type != 'Radio' && typeof question.answers == 'string' && !question.answers.trim()) ||
                  (question.type != 'Checkbox' && question.type != 'Radio' && typeof question.answers == 'number' && question.answers !== 0 && !question.answers) ||
                  ((question.type == 'Checkbox' || question.type == 'Radio') && !question.answers.length)
              )
            ) return false;
          }
        }
    }
    return true;
}

export const validateDynamicFormPage = (form: any): boolean[] => {
  const pageStatus: boolean[] = []; // Almacena el estado de cada página

  for (let i = 0; i < form.forms_data.length; i++) {
      let formItem: any = form.forms_data[i];

      for (let j = 0; j < formItem.pages.length; j++) {
          let page = formItem.pages[j];
          let isPageValid = true; // Asume que la página es válida hasta que se demuestre lo contrario

          for (let k = 0; k < page.length; k++) {
              let question = page[k];
              let isRequired = question.attributes.includes('required');
              let dependencyStatement = question.attributes.find((attr: any) => attr.includes('visibleIf:'));

              // Manejo de dependencias visibles
              if (dependencyStatement) {
                  dependencyStatement = dependencyStatement.replace('visibleIf:', '').trim();
                  let [questionRefID, value] = dependencyStatement.split('==');
                  let questionRef = page.find((quest: any) => quest.id == questionRefID);

                  if (!questionRef?.answers || (questionRef.answers != value && questionRef.answers != value)) {
                      continue; // Salta esta pregunta si no se cumplen las dependencias
                  }
              }

              // Validación de respuestas requeridas
              if (
                  isRequired &&
                  (
                      question.answers === undefined || question.answers === null ||
                      (question.type != 'Checkbox' && question.type != 'Radio' && typeof question.answers == 'string' && !question.answers.trim()) ||
                      (question.type != 'Checkbox' && question.type != 'Radio' && typeof question.answers == 'number' && question.answers !== 0 && !question.answers) ||
                      ((question.type == 'Checkbox' || question.type == 'Radio') && !question.answers.length)
                  )
              ) {
                  isPageValid = false; // Marca la página como inválida si alguna pregunta requerida no tiene respuesta
                  break; // No es necesario seguir validando esta página
              }          
          }

          pageStatus.push(isPageValid); // Guarda el estado de la página
      }
  }

  return pageStatus;
};
export interface InvalidQuestion {
  pageIndex: number;
  name: string;
}

export const validateDynamicFormPageQuestion = (form: any, pageIndex: number): { isPageValid: boolean, invalidQuestions: InvalidQuestion[] } => {
  const invalidQuestions: InvalidQuestion[] = []; // Almacena las preguntas inválidas
  const formItem = form.forms_data[pageIndex]; // Asumimos que solo hay un formulario para la simplificación

  const page = formItem.pages; // Obtener la página correspondiente
  let isPageValid = true; // Asume que la página es válida hasta que se demuestre lo contrario

  page[0].forEach((question: any) => {
      const isRequired = question.attributes.includes('required');
      let dependencyStatement = question.attributes.find((attr: any) => attr.includes('visibleIf:'));

      // Manejo de dependencias visibles
      if (dependencyStatement) {
          dependencyStatement = dependencyStatement.replace('visibleIf:', '').trim();
          const [questionRefID, value] = dependencyStatement.split('==');
          const questionRef = page.find((quest: any) => quest.id === questionRefID);

          if (!questionRef?.answers || questionRef.answers !== value) {
              return; // Salta esta pregunta si no se cumplen las dependencias
          }
      }

      // Validación de respuestas requeridas
      if (
          isRequired &&
          (
              question.answers === undefined || question.answers === null ||
              (question.type !== 'Checkbox' && question.type !== 'Radio' && typeof question.answers === 'string' && !question.answers.trim()) ||
              (question.type !== 'Checkbox' && question.type !== 'Radio' && typeof question.answers === 'number' && question.answers !== 0 && !question.answers) ||
              ((question.type === 'Checkbox' || question.type === 'Radio') && !Array.isArray(question.answers) && !question.answers.length)
          )
      ) {
          isPageValid = false; // Marca la página como inválida si alguna pregunta requerida no tiene respuesta
          invalidQuestions.push({
              pageIndex: question.id,
              name:question.name
          });
      }
  });

  return { isPageValid, invalidQuestions }; // Devuelve el estado de la página y las preguntas inválidas
};

export const validateCedula = (cedula: string): boolean => {
  const regex = /^[0-9]{10}$/; // Cédula debe ser un número de 10 dígitos
  if (!regex.test(cedula)) return false; // Valida el formato

  // Lógica de validación de cédula (puedes agregar más lógica según sea necesario)
  const provinceCode = parseInt(cedula.substring(0, 2), 10);
  if (provinceCode < 1 || provinceCode > 24) return false; // Código de provincia inválido

  const lastDigit = parseInt(cedula.charAt(9), 10);
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    let digit = parseInt(cedula.charAt(i), 10);
    if (i % 2 === 0) {
      digit *= 2;
      if (digit > 9) digit -= 9; // Resta 9 si el resultado es mayor a 9
    }
    sum += digit;
  }
  
  // Validación final
  return (sum % 10 === 0) ? (lastDigit === 0) : (lastDigit === 10 - (sum % 10));
};


export const parsePeriodToActivation = (period?: number): string => {
    if(!period) return 'Inmediata';
    if(period <= 24) return `${period} horas`;
    if(period < 720){
      if(!(period % 24)) return `${period / 24} días`;
      return `${period/24} días y ${period % 24} horas`;
    }
    if(!(period % 720)) return `${period / 720} meses`;
    return `${period/720} meses y ${period % 720} días`;
}
//Validate hash Establishment
export function validateHash(api: any): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const body = { sourceFile: 'epm_contract', contAddress: control.value };
    return api.getCustomerHash(body).pipe(
      tap((c)=>{
      }),
      map(({ answer }) => {
        if (answer) {
          return null
        } else {
          return { hash: true };
        }
      }),
      catchError(() => of(null))
    );
  };
}
export function parseError(error: any): string{
  console.log(error);
  if(error.hasOwnProperty('required')) return 'Este campo es obligatorio';
  if(error.hasOwnProperty('email')) return 'Ingrese un email válido';
  if(error.hasOwnProperty('hash')) return 'Ingrese un hash válido';
  if(error.hasOwnProperty('names')) return 'Este campo no puede tener números ni caracteres especiales';
  if(error.hasOwnProperty('phone')) return 'Este campo solo puede contener números';
  if(error.hasOwnProperty('minlength')) return `Ingrese por lo menos ${error.minlength.requiredLength} caracteres`;
  if(error.hasOwnProperty('maxlength')) return `Ingrese máximo ${error.maxlength.requiredLength} caracteres`;
  if(error.hasOwnProperty('negative')) return `Debe ingresar un número positivo`;
  if(error.hasOwnProperty('decimal')) return `El número debe ser entero`;
  if(error.hasOwnProperty('noValidPass')) return `La contraseña no cumple los parámetros`;
  if(error.hasOwnProperty('dniNotFound')) return `El DNI ingresado ya existe`;
  if(error.hasOwnProperty('invalidCI')) return `El DNI ingresado no es valido`;
  if(error.hasOwnProperty('minDate')) return `Ingrese una fecha mayor  a la actual`;
  if(error.hasOwnProperty('idExists')) return `Ingrese otro id`;
  return 'Por favor, ingrese un valor válido';
}




