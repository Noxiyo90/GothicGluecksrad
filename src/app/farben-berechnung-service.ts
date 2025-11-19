import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FarbenBerechnungService {


  buildSegmenteCssString(anzahlSegmente: number, gewinnerSegment: number | null, highlightWinner: boolean): string {
    const grautoene = this.berechneGrautoene(anzahlSegmente);
    let segmentListe: string[] = []

    let currentWinkel = 0;
    const winkelEinesSegments = 360/anzahlSegmente
    for (let i = 0; i < anzahlSegmente; i++) {

      const istGewinner =
        highlightWinner &&
        gewinnerSegment !== null &&
        i === gewinnerSegment;

      const farbe = istGewinner
        ? 'hsl(50 90% 55%)'
        : grautoene[i % grautoene.length];

      const start = currentWinkel;
      const end = currentWinkel + winkelEinesSegments;
      segmentListe.push(`${farbe} ${start}deg ${end}deg`);

      currentWinkel = end;
    }

    return `conic-gradient(${segmentListe.join(', ')})`
  }

  private berechneGrautoene(segmente: number): string[] {
    const grautoeneArray: string[] = [];
    const dunkelsterGrauton = 20;
    const hellsterGrauton = 80;

    const graustufenAnzahl =
      segmente <= 3 ? segmente : Math.ceil(segmente / 2);

    for (let j = 0; j < graustufenAnzahl; j++) {
      const t = graustufenAnzahl === 1 ? 0 : j / (graustufenAnzahl - 1); // 0..1
      const lightness = hellsterGrauton + t * (dunkelsterGrauton - hellsterGrauton);
      grautoeneArray.push(`hsl(0 0% ${lightness}%)`);
    }

    return grautoeneArray.reverse();
  }
}
