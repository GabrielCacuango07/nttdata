import { AfterContentInit, ChangeDetectorRef, Component, ContentChild, ElementRef, Input, OnChanges } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { parseError } from 'src/app/utils/forms-validators.utils';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css']
})
export class TextInputComponent implements OnChanges,AfterContentInit {
  
  @Input() filled: boolean = false;
  @Input() label: string = '';
  @Input() control: FormControl | any;
  @Input() edit: boolean = true;

  public required: boolean = false;

  @ContentChild('epmInput', {static: true})
  input: ElementRef | any  ;
  

  public error: {hasError: boolean, message: string} = {
    hasError: false,
    message: 'Ha ocurrido un error'
  };

  constructor(
    private cdr: ChangeDetectorRef
  ) { }
  ngAfterContentInit(): void {
    
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

  ngOnChanges(){
    if(!this.edit) this.input.nativeElement.disabled = true;
    else this.input.nativeElement.disabled = false;
  }

}
