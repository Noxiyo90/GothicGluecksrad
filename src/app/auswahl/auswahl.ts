import {Component, computed, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CharacterData} from '../daten';

@Component({
  selector: 'app-auswahl',
  imports: [
    FormsModule
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

  aktiveFelder = computed(() => {

    const sichtbarkeit = this.sichtbarkeit();

    const felder: (keyof CharacterData)[] = [
      'herkunft',
      'fraktion',
      'alter',
      'staerke',
      'geschick',
      'magiebegabung',
      'nahkampf',
      'fernkampf',
      'goettergabe',
      'mission',
    ];

    if (sichtbarkeit.magiekreis) this.fuegeInArrayEin(felder,'magiekreis', 'magiebegabung');
    if (sichtbarkeit.lieblingszauber) this.fuegeInArrayEin(felder,'lieblingszauber', 'magiekreis');

    if (sichtbarkeit.nahkampfwaffe) this.fuegeInArrayEin(felder,'nahkampfwaffe', 'nahkampf');
    if (sichtbarkeit.nahkampffertigkeit) this.fuegeInArrayEin(felder,'nahkampffertigkeit', 'nahkampfwaffe');
    if (sichtbarkeit.fernkampfwaffe) this.fuegeInArrayEin(felder,'fernkampfwaffe', 'fernkampf');
    if (sichtbarkeit.fernkampffertigkeit) this.fuegeInArrayEin(felder,'fernkampffertigkeit', 'fernkampfwaffe');

    if (sichtbarkeit.gott) this.fuegeInArrayEin(felder,'gott', 'goettergabe');

    if (sichtbarkeit.adanossegen) this.fuegeInArrayEin(felder,'adanossegen', 'gott');
    if (sichtbarkeit.adanossegen) this.fuegeInArrayEin(felder,'adanosfluch', 'gott');
    if (sichtbarkeit.adanossegen) this.fuegeInArrayEin(felder,'innossegen', 'gott');
    if (sichtbarkeit.adanossegen) this.fuegeInArrayEin(felder,'innosfluch', 'gott');
    if (sichtbarkeit.adanossegen) this.fuegeInArrayEin(felder,'beliarsegen', 'gott');
    if (sichtbarkeit.adanossegen) this.fuegeInArrayEin(felder,'beliarfluch', 'gott');

    return felder;
  });

  private fuegeInArrayEin(array: string[], eingabe: string, vorherigerString: string) {
    const index = array.indexOf(vorherigerString);
    if (index !== -1) {
      array.splice(index + 1, 0, eingabe);
    }
  }
}
