import { parseError } from "./forms-validators.utils";

describe('forms utils ', () => {
  it('parse error ', () => {
    let errors:any = {required:true}
    let parsed = parseError(errors)
    expect(parsed).toEqual("Este campo es obligatorio");

     errors = {minlength:{ requiredLength:5 }}
     parsed = parseError(errors)
    expect(parsed).toEqual("Ingrese por lo menos 5 caracteres");

    errors = {maxlength:{ requiredLength:5 }}
     parsed = parseError(errors)
    expect(parsed).toEqual("Ingrese máximo 5 caracteres");

    errors = {minDate:true}
     parsed = parseError(errors)
    expect(parsed).toEqual("Ingrese una fecha mayor  a la actual");

    errors = {idExists:true}
     parsed = parseError(errors)
    expect(parsed).toEqual("Ingrese otro id");

    errors = {}
     parsed = parseError(errors)
    expect(parsed).toEqual("Por favor, ingrese un valor válido");
    
    
    
  });
});