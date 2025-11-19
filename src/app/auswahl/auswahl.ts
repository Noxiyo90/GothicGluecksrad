import {Component, input, output, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-auswahl',
  imports: [
    FormsModule
  ],
  templateUrl: './auswahl.html',
  styleUrl: './auswahl.css',
})
export class Auswahl {
  zahl = signal(1)
  zahlSelected = output<number>();


  onSubmit() {
    this.zahlSelected.emit(this.zahl());
  }
}
