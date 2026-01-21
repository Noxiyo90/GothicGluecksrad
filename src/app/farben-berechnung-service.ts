import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FarbenBerechnungService {

  private readonly farbPalette: string[] = this.createFarbPalette();

  buildSegmenteCssString(anzahlSegmente: number, gewinnerSegment: number | null, highlightWinner: boolean): string {
    const farben = this.farbPalette.slice(0, anzahlSegmente);
    let segmentListe: string[] = []

    let currentWinkel = 0;
    const winkelEinesSegments = 360/anzahlSegmente
    for (let i = 0; i < anzahlSegmente; i++) {

      const istGewinner =
        highlightWinner &&
        gewinnerSegment !== null &&
        i === gewinnerSegment;

      const farbe = istGewinner
        ? 'hsl(var(--winner-h) var(--winner-s) var(--winner-l))'
        : farben[i % farben.length];

      const start = currentWinkel;
      const end = currentWinkel + winkelEinesSegments;
      segmentListe.push(`${farbe} ${start}deg ${end}deg`);

      currentWinkel = end;
    }

    return `conic-gradient(${segmentListe.join(', ')})`
  }

  private createFarbPalette(): string[] {
    const BASEFARBEN = [
      'hsl(215 25% 28%)',
      'hsl(215 25% 34%)',
      'hsl(215 25% 40%)',
      'hsl(215 25% 46%)',
      'hsl(215 25% 52%)',
      'hsl(215 25% 58%)',
      'hsl(215 25% 64%)',
    ];
    const PALETTENGROESSE = 100;
    const result: string[] = [];

    for (let i = 0; i < PALETTENGROESSE; i++) {
      const randomIndex = Math.floor(Math.random() * BASEFARBEN.length);
      result.push(BASEFARBEN[randomIndex]);
    }
    return this.fixAdjacentDuplicates(result, BASEFARBEN);
  }

  private fixAdjacentDuplicates(
    palette: string[],
    base: string[]
  ): string[] {
    const result = [...palette];
    const n = result.length;

    for (let i = 0; i < n; i++) {
      const left = result[(i - 1 + n) % n];
      const right = result[(i + 1) % n];

      if (result[i] === left || result[i] === right) {
        const alternatives = base.filter(
          c => c !== left && c !== right
        );

        if (alternatives.length > 0) {
          // deterministisch, kein neues Random nötig
          result[i] = alternatives[i % alternatives.length];
        }
      }
    }

    return result;
  }

}
