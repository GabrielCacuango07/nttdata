import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-primary-button',
  templateUrl: './primary-button.component.html',
  styleUrls: ['./primary-button.component.css']
})
export class PrimaryButtonComponent {
  @Input() enabled: boolean = true;           // Determina si el botón está habilitado o no
  @Input() color: string = '';                // Color del botón (opcional)
  @Input() navigateTo: any | string | undefined;     // Ruta a la que redirige el botón
  @Input() type: string = 'button'; 
  
  
  constructor(private router: Router) {}  // Inyectar Router

  onClick() {
    console.log("navegaaa")
    if (this.navigateTo && this.enabled) {
      this.router.navigate(this.navigateTo);  // Navegar programáticamente
    }
  }
}
