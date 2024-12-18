import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  @Output() search = new EventEmitter<string>(); // Evento para enviar el término de búsqueda
  searchTerm: string = ''; // Almacena el texto ingresado

  onSearch(): void {
    this.search.emit(this.searchTerm); // Emite el término de búsqueda
  }

}
