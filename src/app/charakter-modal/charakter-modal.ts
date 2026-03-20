import { Component, computed, input, output } from '@angular/core';
import { CharacterData } from '../daten';

interface FeldAnzeige {
  label: string;
  wert: string;
}

const FELD_REIHENFOLGE: { key: keyof CharacterData; label: string }[] = [
  { key: 'herkunft',          label: 'Herkunft' },
  { key: 'fraktion',          label: 'Fraktion / Gilde' },
  { key: 'alter',             label: 'Alter' },
  { key: 'staerke',           label: 'Stärke' },
  { key: 'geschick',          label: 'Geschick' },
  { key: 'magiebegabung',     label: 'Magiebegabung' },
  { key: 'magiekreis',        label: 'Magiekreis' },
  { key: 'lieblingszauber',   label: 'Lieblingszauber' },
  { key: 'nahkampf',          label: 'Nahkampf' },
  { key: 'nahkampfwaffe',     label: 'Nahkampfwaffe' },
  { key: 'nahkampffertigkeit',label: 'Nahkampf-Fertigkeit' },
  { key: 'fernkampf',         label: 'Fernkampf' },
  { key: 'fernkampfwaffe',    label: 'Fernkampfwaffe' },
  { key: 'fernkampffertigkeit',label: 'Fernkampf-Fertigkeit' },
  { key: 'goettergabe',       label: 'Göttergabe' },
  { key: 'gott',              label: 'Gott' },
  { key: 'adanossegen',       label: 'Segen Adanos\'' },
  { key: 'adanosfluch',       label: 'Fluch Adanos\'' },
  { key: 'innossegen',        label: 'Segen Innos\'' },
  { key: 'innosfluch',        label: 'Fluch Innos\'' },
  { key: 'beliarsegen',       label: 'Segen Beliar\'' },
  { key: 'beliarfluch',       label: 'Fluch Beliar\'' },
  { key: 'mission',           label: 'Mission / Ziel' },
];

@Component({
  selector: 'app-charakter-modal',
  templateUrl: './charakter-modal.html',
  styleUrl: './charakter-modal.css',
})
export class CharakterModal {
  characterData = input.required<CharacterData>();
  name = input.required<string>();
  neuStarten = output<void>();

  felder = computed<FeldAnzeige[]>(() => {
    const data = this.characterData();
    return FELD_REIHENFOLGE
      .filter(f => !!data[f.key])
      .map(f => ({ label: f.label, wert: data[f.key]! }));
  });
}
