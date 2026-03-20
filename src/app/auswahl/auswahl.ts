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
    this.characterData.update(data => ({
      ...data,
      [field]: value
    }));
  }

  private static readonly BASISFELDER: (keyof CharacterData)[] = [
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

  felder: (keyof CharacterData)[] = [...Auswahl.BASISFELDER];

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

    if (sichtbarkeit.magiekreis) this.fuegeInArrayEin(this.felder,'magiekreis', 'magiebegabung');
    if (sichtbarkeit.lieblingszauber) this.fuegeInArrayEin(this.felder,'lieblingszauber', 'magiekreis');

    if (sichtbarkeit.nahkampfwaffe) this.fuegeInArrayEin(this.felder,'nahkampfwaffe', 'nahkampf');
    if (sichtbarkeit.nahkampffertigkeit) this.fuegeInArrayEin(this.felder,'nahkampffertigkeit', 'nahkampfwaffe');
    if (sichtbarkeit.fernkampfwaffe) this.fuegeInArrayEin(this.felder,'fernkampfwaffe', 'fernkampf');
    if (sichtbarkeit.fernkampffertigkeit) this.fuegeInArrayEin(this.felder,'fernkampffertigkeit', 'fernkampfwaffe');

    if (sichtbarkeit.gott) this.fuegeInArrayEin(this.felder,'gott', 'goettergabe');

    if (sichtbarkeit.adanossegen) this.fuegeInArrayEin(this.felder,'adanossegen', 'gott');
    if (sichtbarkeit.adanosfluch) this.fuegeInArrayEin(this.felder,'adanosfluch', 'gott');
    if (sichtbarkeit.innossegen) this.fuegeInArrayEin(this.felder,'innossegen', 'gott');
    if (sichtbarkeit.innosfluch) this.fuegeInArrayEin(this.felder,'innosfluch', 'gott');
    if (sichtbarkeit.beliarsegen) this.fuegeInArrayEin(this.felder,'beliarsegen', 'gott');
    if (sichtbarkeit.beliarfluch) this.fuegeInArrayEin(this.felder,'beliarfluch', 'gott');

    return this.felder;
  });

  reset() {
    this.characterData.set({});
    this.felder = [...Auswahl.BASISFELDER];
  }

  private fuegeInArrayEin(array: string[], eingabe: string, vorherigerString: string) {
    if (array.includes(eingabe)) return;
    const index = array.indexOf(vorherigerString);
    if (index !== -1) {
      array.splice(index + 1, 0, eingabe);
    }
  }
}
