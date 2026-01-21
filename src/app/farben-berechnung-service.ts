import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FarbenBerechnungService {

  readonly BASEFARBEN: string[] = [
    'hsl(215 25% 28%)',
    'hsl(215 25% 34%)',
    'hsl(215 25% 40%)',
    'hsl(215 25% 46%)',
    'hsl(215 25% 52%)',
    'hsl(215 25% 58%)',
    'hsl(215 25% 64%)',
  ];

  private readonly farbPalette: string[] = this.createFarbPalette(this.BASEFARBEN);

  buildSegmenteCssString(anzahlSegmente: number, gewinnerSegment: number | null, highlightWinner: boolean): string {
    const farben = this.fixAdjacentDuplicates(this.farbPalette.slice(0, anzahlSegmente), this.BASEFARBEN, anzahlSegmente);
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

  private createFarbPalette(baseFarben: string[]): string[] {
    const PALETTENGROESSE = 100;
    const result: string[] = [];
    for (let i = 0; i < PALETTENGROESSE; i++) {
      const randomIndex = Math.floor(Math.random() * baseFarben.length);
      result.push(baseFarben[randomIndex]);
    }
    return result
  }

  private fixAdjacentDuplicates(
    zuFixendePalette: string[],
    basefarben: string[],
    anzahlSegmente: number
  ): string[] {

    zuFixendePalette.forEach((color, index) => {
      const linkeFarbe =
        zuFixendePalette[(index - 1 + anzahlSegmente) % anzahlSegmente];
      const rechteFarbe =
        zuFixendePalette[(index + 1) % anzahlSegmente];

      if (color === linkeFarbe || color === rechteFarbe) {
        const alternatives = basefarben.filter(
          c => c !== linkeFarbe && c !== rechteFarbe
        );

        if (alternatives.length > 0) {
          zuFixendePalette[index] =
            alternatives[index % alternatives.length];
        }
      }
    });

    if (
      anzahlSegmente > 1 &&
      zuFixendePalette[0] === zuFixendePalette[anzahlSegmente - 1]
    ) {
      const alternatives = basefarben.filter(
        c =>
          c !== zuFixendePalette[1] &&
          c !== zuFixendePalette[anzahlSegmente - 1]
      );

      if (alternatives.length > 0) {
        zuFixendePalette[0] = alternatives[0];
      }
    }

    return zuFixendePalette;
  }


}
