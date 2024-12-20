import { ChangeDetectorRef, Component, ContentChild, ElementRef, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { parseError } from 'src/app/utils/forms-validators.utils';

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateInputComponent),
      multi: true,
    },
  ],
})
export class DateInputComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() edit: boolean = true;
  @Input() control: FormControl | any;
  value: string = '';
  public required: boolean = false;

  @ContentChild('dateInput', {static: true})
  input: ElementRef | undefined;
  constructor(
    private cdr: ChangeDetectorRef
  ) { }
  public error: {hasError: boolean, message: string} = {
    hasError: false,
    message: 'Ha ocurrido un error'
  };
  // Métodos de ControlValueAccessor
  onChange = (value: string) => {};
  onTouched = () => {};

  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.edit = !isDisabled;
  }

  handleInputChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }
  
   ngAfterContentInit(): void {
    if(!this.edit) {
      this.input?.nativeElement.setAttribute('disabled',true);
      
    }

    this.setDisabledState
    this.input?.nativeElement.classList.add('date-input');
    if(!this.edit) this.input?.nativeElement.setAttribute('disabled',true);
      
      if(this.control) {
        this.required = this.control?.hasValidator(Validators.required)
        this.control.statusChanges.pipe().subscribe(
  
          (value:any) => {
            if(this.control.errors){
              this.error = {
                hasError: true,
                message: parseError(this.control.errors)
              };
            }else if(!this.control.errors && this.error.hasError){
              this.error = {
                hasError: false,
                message: ''
              };
            }
            this.cdr.detectChanges();
          }
        );
      } 
    }
}
