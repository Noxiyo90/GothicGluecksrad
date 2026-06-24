import { Injectable } from '@angular/core';
import { CharacterData } from './daten';
import {
  BEINAMEN_GESCHICK,
  BEINAMEN_KOMBINATION,
  BEINAMEN_STAERKE,
  ORK_VORNAMEN,
  VORNAMEN,
} from './namen-daten';

@Injectable({
  providedIn: 'root',
})
export class NamensGeneratorService {

  generiereNamen(data: CharacterData): string {
    const vornamenPool = data.fraktion === 'Ork'
      ? ORK_VORNAMEN
      : VORNAMEN[data.herkunft ?? 'Nordmar'] ?? VORNAMEN['Nordmar'];
    const vorname = this.waehleZufaellig(vornamenPool);
    const beiname = this.berechneBeiname(data);
    return beiname ? `${vorname} ${beiname}` : vorname;
  }

  private berechneBeiname(data: CharacterData): string | null {
    const maxStaerke = data.staerke === '200';
    const maxGeschick = data.geschick === '200';

    if (maxStaerke && maxGeschick) return this.waehleZufaellig(BEINAMEN_KOMBINATION);
    if (maxStaerke) return this.waehleZufaellig(BEINAMEN_STAERKE);
    if (maxGeschick) return this.waehleZufaellig(BEINAMEN_GESCHICK);
    return null;
  }

  private waehleZufaellig<T>(liste: T[]): T {
    return liste[Math.floor(Math.random() * liste.length)];
  }
}
