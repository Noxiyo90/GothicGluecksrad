import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Gluecksrad} from './gluecksrad/gluecksrad';
import {Auswahl} from './auswahl/auswahl';
import {FarbenBerechnungService} from './farben-berechnung-service';

@Component({
  selector: 'app-root',
  imports: [Gluecksrad, Auswahl],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  selectedZahl = signal(1);

  onZahlSelected(value: number) {
    this.selectedZahl.set(value);
  }
}
