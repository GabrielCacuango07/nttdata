import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  @Input() headers: { title: string, icon?: string }[] = [];
  @Input() data: { [key: string]: any }[] = [];

   // Método para obtener las claves del objeto
   getKeys(row: { [key: string]: any }) {
    return Object.keys(row);
  }
 
}
