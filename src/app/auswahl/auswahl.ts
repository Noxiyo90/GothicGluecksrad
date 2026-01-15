import {Component, computed, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CharacterData} from '../daten';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-auswahl',
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './auswahl.html',
  styleUrl: './auswahl.css',
})
export class Auswahl {
  characterData = signal<CharacterData>({}); // initial leer

  setField<K extends keyof CharacterData>(field: K, value: CharacterData[K]) {
    console.log(`Setze ${field} auf ${value}`)
    this.characterData.update(data => ({
      ...data,
      [field]: value
    }));
  }

  sichtbarkeit = computed(() => {
    const data = this.characterData();

    return {
      nahkampfwaffe: data.nahkampf === 'Ja',
      nahkampffertigkeit: data.nahkampf === 'Ja',

      fernkampfwaffe: data.fernkampf === 'Ja',
      fernkampffertigkeit: data.fernkampf === 'Ja',

      magiekreis: data.magiebegabung === 'Ja',
      lieblingszauber: data.magiebegabung === 'Ja' && !!data.magiekreis,

      gott: data.goettergabe === 'Fluch' || data.goettergabe === 'Segen',
      adanossegen: data.goettergabe === 'Segen' && data.gott === 'Adanos',
      adanosfluch: data.goettergabe === 'Fluch' && data.gott === 'Adanos',
      innossegen: data.goettergabe === 'Segen' && data.gott === 'Innos',
      innosfluch: data.goettergabe === 'Fluch' && data.gott === 'Innos',
      beliarsegen: data.goettergabe === 'Segen' && data.gott === 'Beliar',
      beliarfluch: data.goettergabe === 'Fluch' && data.gott === 'Beliar',
    };
  });
}
