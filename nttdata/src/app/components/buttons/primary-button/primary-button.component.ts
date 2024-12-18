import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-primary-button',
  templateUrl: './primary-button.component.html',
  styleUrls: ['./primary-button.component.css']
})
export class PrimaryButtonComponent {
  @Input() enabled: boolean = true;           
  @Input() color: string = '';                
  @Input() navigateTo: any | string | undefined;     
  @Input() type: string = 'button'; 
  
  
  constructor(private router: Router) {}  

  onClick() {
    console.log("navegaaa")
    if (this.navigateTo && this.enabled) {
      this.router.navigate(this.navigateTo);  
    }
  }
}
