import { Component, ElementRef, ViewChild, computed, inject, input, output } from '@angular/core';
import { CharacterData } from '../daten';
import { PdfExportService } from '../pdf-export-service';

interface FeldAnzeige {
  label: string;
  wert: string;
}

export interface GruppeAnzeige {
  titel: string;
  felder: FeldAnzeige[];
  unterGruppen: FeldAnzeige[][];
}

type FeldDef = { key: keyof CharacterData; label: string };
const FELD_GRUPPEN: { titel: string; unterGruppen: FeldDef[][] }[] = [
  {
    titel: 'Herkunft & Identität',
    unterGruppen: [[
      { key: 'herkunft', label: 'Herkunft' },
      { key: 'fraktion', label: 'Fraktion / Gilde' },
      { key: 'alter',    label: 'Alter' },
    ]],
  },
  {
    titel: 'Kampf & Fähigkeiten',
    unterGruppen: [
      [
        { key: 'staerke',  label: 'Stärke' },
        { key: 'geschick', label: 'Geschick' },
      ],
      [
        { key: 'nahkampf',           label: 'Nahkampf' },
        { key: 'nahkampfwaffe',      label: 'Nahkampfwaffe' },
        { key: 'nahkampffertigkeit', label: 'Nahkampf-Fertigkeit' },
      ],
      [
        { key: 'fernkampf',           label: 'Fernkampf' },
        { key: 'fernkampfwaffe',      label: 'Fernkampfwaffe' },
        { key: 'fernkampffertigkeit', label: 'Fernkampf-Fertigkeit' },
      ],
    ],
  },
  {
    titel: 'Magie',
    unterGruppen: [[
      { key: 'magiebegabung',   label: 'Magiebegabung' },
      { key: 'magiekreis',      label: 'Magiekreis' },
      { key: 'lieblingszauber', label: 'Lieblingszauber' },
    ]],
  },
  {
    titel: 'Göttliche Gabe',
    unterGruppen: [[
      { key: 'goettergabe', label: 'Göttergabe' },
      { key: 'gott',        label: 'Gott' },
      { key: 'adanossegen', label: 'Adanos-Segen' },
      { key: 'adanosfluch', label: 'Adanos-Fluch' },
      { key: 'innossegen',  label: 'Innos-Segen' },
      { key: 'innosfluch',  label: 'Innos-Fluch' },
      { key: 'beliarsegen', label: 'Beliar-Segen' },
      { key: 'beliarfluch', label: 'Beliar-Fluch' },
    ]],
  },
  {
    titel: 'Mission',
    unterGruppen: [[
      { key: 'mission', label: 'Mission / Ziel' },
    ]],
  },
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

  @ViewChild('steckbrief') steckbrief!: ElementRef<HTMLElement>;
  private pdfExportService = inject(PdfExportService);

  async exportierePdf(): Promise<void> {
    const aktionen = this.steckbrief.nativeElement.querySelector('.modal-aktionen') as HTMLElement;
    aktionen.style.display = 'none';
    await this.pdfExportService.exportiere(this.steckbrief.nativeElement, this.name());
    aktionen.style.display = '';
  }

  gruppen = computed<GruppeAnzeige[]>(() => {
    const data = this.characterData();
    return FELD_GRUPPEN
      .map(gruppe => {
        const unterGruppen = gruppe.unterGruppen
          .map(zeile => zeile
            .filter(f => !!data[f.key])
            .map(f => ({ label: f.label, wert: data[f.key]! }))
          )
          .filter(zeile => zeile.length > 0);
        return { titel: gruppe.titel, felder: unterGruppen.flat(), unterGruppen };
      })
      .filter(gruppe => gruppe.felder.length > 0);
  });
}
