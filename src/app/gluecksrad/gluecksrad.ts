import {Component, computed, input, signal} from '@angular/core';
import {NgStyle} from '@angular/common';
import {FarbenBerechnungService} from '../farben-berechnung-service';

@Component({
  selector: 'app-gluecksrad',
  imports: [
    NgStyle
  ],
  templateUrl: './gluecksrad.html',
  styleUrl: './gluecksrad.css',
})
export class Gluecksrad {
  // auch im gluecksrad.css bei "transition: transform 4s" anpassen
  readonly drehzeitMs: number = 4000;

  werte = input<string[]>([]);

  anzahlSegmente = computed(() => this.werte().length);


  derzeitigerRotationsWinkel = signal(0);
  idleDrehen = signal(true);

  gewinnerSegment = signal<number | null>(null);
  highlightWinner = signal(false);

  ngOnChanges(): void {
    console.log(this.werte());
    console.log(this.anzahlSegmente());

  }

  constructor(private farbenBerechnungService: FarbenBerechnungService) {
  }

  onDrehen() {
    this.idleDrehen.set(false);
    this.highlightWinner.set(false)
    this.berechneNeueRotation()
    setTimeout(() => {
      this.berechneGewinnerSegment();
      this.highlightWinner.set(true);
    }, this.drehzeitMs + 50);
  }

  gradient = computed(() => {
    return this.farbenBerechnungService.buildSegmenteCssString(
      this.anzahlSegmente(),
      this.gewinnerSegment(),
      this.highlightWinner());
  })

  berechneNeueRotation(): void {
    const minExtra = 0;
    const maxExtra = 360;

    const extraRandom =
      Math.floor(Math.random() * (maxExtra - minExtra + 1)) + minExtra;

    const delta = 360 * 4 + extraRandom;

    this.derzeitigerRotationsWinkel.update((old) => old + delta);
  }

  /**
   * Komplizierte Rechnung, aber hier einmal verständlich erklärt:
   *
   * 1. Zuerst berechnen wir den Winkel eines einzelnen Segments.
   *    Ein Kreis hat 360°. Bei n Segmenten ist jedes Segment 360/n Grad breit.
   *
   * 2. Anschließend wollen wir wissen, wie weit sich der "0°-Punkt" des Rads
   *    durch unsere Drehung verschoben hat. Da das Rad sich mehrfach drehen kann,
   *    reduzieren wir die Rotation mit % 360 auf den tatsächlichen Restwinkel.
   *
   * 3. 0° beim conic-gradient liegt OBEN. Unser Zeiger jedoch steht RECHTS
   *    (also bei 90°). Um das Koordinatensystem so zu verschieben,
   *    dass 0° in unserem Berechnungssystem am Zeiger liegt,
   *    ziehen wir 90° von der Rotation ab:
   *
   *        gradModulo = (rotation - 90) % 360
   *
   * 4. Da das Rad im Uhrzeigersinn gedreht wurde, wandert der Inhalt nach links.
   *    Um herauszufinden, welcher ursprüngliche Winkel jetzt unter dem Zeiger liegt,
   *    „drehen“ wir diesen Winkel zurück:
   *
   *        relativ = 360 - gradModulo
   *
   *    Der Wert "relativ" gibt also den Winkel an, der nach der Drehung
   *    GENAU am Zeiger rechts steht.
   *
   * 5. Jetzt müssen wir nur noch bestimmen, zu welchem Segment
   *    dieser Winkel gehört:
   *
   *        gewinnerSegment = floor(relativ / winkelEinesSegments)
   *
   * Beispiel:
   * 10 Segmente und 1710° Drehung (4 3/4 Umdrehungen)
   *
   * - Segmentwinkel: 360/10 = 36°
   * - gradModulo = (1710 - 90) % 360 = 180°
   * - relativ = 360 - 180 = 180°
   * - Segmentindex = 180 / 36 = 5
   *
   * Segment 5 liegt also nach der Drehung genau am Zeiger.
   */
  private berechneGewinnerSegment() {
    const winkelEinesSegments = 360 / this.anzahlSegmente();
    let gradModulo = (this.derzeitigerRotationsWinkel() - 90) % 360;
    const relativ = 360 - gradModulo;
    const gewinnerSegment = Math.floor(relativ / winkelEinesSegments);
    this.gewinnerSegment.set(gewinnerSegment);
  }

  private winkelFuerIndex(index: number): number {
    const segmente = this.anzahlSegmente();
    if (!segmente) {
      return 0;
    }

    const winkelProSegment = 360 / segmente;
    return index * winkelProSegment + winkelProSegment / 2;
  }

  labelContainerStyle(index: number) {
    const mid = this.winkelFuerIndex(index);

    return {
      transform: `rotate(${mid}deg)`
    };
  }

  labelTextStyle(index: number) {
    const mid = this.winkelFuerIndex(index);

    return {
      transform: `translate(0, -42%) rotate(${-mid}deg)`
    };
  }
}
