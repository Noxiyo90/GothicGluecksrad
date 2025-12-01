import {Component, signal} from '@angular/core';
import {Gluecksrad} from './gluecksrad/gluecksrad';
import {Auswahl} from './auswahl/auswahl';
import {DefaultValues} from './daten';

@Component({
  selector: 'app-root',
  imports: [Gluecksrad, Auswahl],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  selectedZahl = signal(DefaultValues.length);

  onZahlSelected(value: number) {
    // this.selectedZahl.set(value);
  }
}
