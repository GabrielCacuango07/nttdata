import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spiner.component.html',
  styleUrls: ['./spiner.component.css'], 
})
export class SpinnerComponent {

  @Input() isLoading: boolean = false; 

}