import { Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'app-dialogs',
  templateUrl: './dialogs.component.html',
  styleUrls: ['./dialogs.component.css']
})
export class DialogsComponent {
  @Input() title: string = ''; // Título del diálogo
  @Input() isVisible: boolean = false; // Controla la visibilidad
  @Output() close = new EventEmitter<void>(); // Emite un evento al cerrar
  @Output() confirmAction = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }

  confirm() {
    console.log('Botón "Sí" presionado en el diálogo');
  this.confirmAction.emit();
  }
}
