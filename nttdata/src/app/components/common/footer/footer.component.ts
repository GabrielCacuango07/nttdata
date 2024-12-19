import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})

export class FooterComponent {
  
  public year: number=2024 ;

    
    constructor() {
      const fecha = new Date();
      this.year = fecha.getFullYear(); 
    }  

}
