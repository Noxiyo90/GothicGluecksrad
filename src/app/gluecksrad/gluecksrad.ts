import {Component, computed, effect, ElementRef, input, output, signal, ViewChild} from '@angular/core';
import {NgStyle} from '@angular/common';
import {FarbenBerechnungService} from '../farben-berechnung-service';
import {SoundService} from '../sound.service';
import {SegmentGruppe} from '../daten';

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

  segmentGruppe = input<SegmentGruppe>();
  started = input<boolean>(false);

  anzahlSegmente = computed(() => this.segmentGruppe()!.werte.length);


  derzeitigerRotationsWinkel = signal(0);
  idleDrehen = signal(true);
  @ViewChild('radIdleContainer') radIdleContainer!: ElementRef<HTMLElement>;
  blockeDrehen = false;
  gewinnerSegment = signal<number | null>(null);
  gewinnerSegmentOutput = output<number>();
  startGame = output<void>();
  highlightWinner = signal(false);

  constructor(private farbenBerechnungService: FarbenBerechnungService, private soundService: SoundService) {
    effect(() => {
      const gruppe = this.segmentGruppe();
      this.gewinnerSegment.set(null);
      this.highlightWinner.set(false);
      this.blockeDrehen = false;
      if (gruppe?.id === 'default') {
        this.idleDrehen.set(true);
      }
    });
  }

  onDrehen() {
    if (this.blockeDrehen) return;
    this.blockeDrehen = true;
    this.highlightWinner.set(false);
    const currentAngle = this.derzeitigerRotationsWinkel();
    const delta = this.berechneNeueRotation();
    this.soundService.playRattle(this.drehzeitMs, this.anzahlSegmente(), delta, currentAngle);
    setTimeout(() => {
      this.berechneGewinnerSegment();
      this.highlightWinner.set(true);
    }, this.drehzeitMs + 50);
  }

  start() {
    if (this.blockeDrehen) return;
    this.blockeDrehen = true;
    const el = this.radIdleContainer.nativeElement;
    const transformStr = window.getComputedStyle(el).transform;
    const matrix = transformStr !== 'none' ? new DOMMatrix(transformStr) : new DOMMatrix();
    const currentAngle = Math.atan2(matrix.b, matrix.a) * (180 / Math.PI);

    el.classList.remove('idle');
    this.idleDrehen.set(false);

    const anim = el.animate(
      [
        { transform: `rotate(${currentAngle}deg)` },
        { transform: `rotate(${currentAngle + 3}deg)` }
      ],
      { duration: 1000, easing: 'cubic-bezier(0.5, 1.0, 0.5, 1.0)', fill: 'forwards' }
    );

    setTimeout(() => {
      anim.cancel();
      this.startGame.emit();
    }, 1000);
  }

  speichenDaten = computed<number[]>(() => {
    const n = this.anzahlSegmente();
    const winkel = 360 / n;
    return Array.from({length: n}, (_, i) => i * winkel);
  });

  gradient = computed(() => {
    return `url('images/Schild.png')`;
  })

  berechneNeueRotation(): number {
    const extraRandom = Math.floor(Math.random() * 361);
    const delta = 360 * 4 + extraRandom;
    this.derzeitigerRotationsWinkel.update((old) => old + delta);
    return delta;
  }

  labelContainerStyle(index: number) {
    const rawAngle = this.winkelFuerIndex(index); // oder (index - 1 + segmente) % segmente
    const angleInDegrees = rawAngle - 90;
    const angleInRadians = angleInDegrees * Math.PI / 180;

    const outerRadius = 50;
    const innerRadius = 10;
    const radius = (outerRadius + innerRadius) / 2;

    const x = 50 + radius * Math.cos(angleInRadians);
    const y = 50 + radius * Math.sin(angleInRadians);

    return {
      position: 'absolute',
      top: `${y}%`,
      left: `${x}%`,
      transform: `translate(-50%, -50%) rotate(${angleInDegrees}deg)`,
      transformOrigin: 'center center',
      pointerEvents: 'none',
      textAlign: 'center',
    };
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
    this.gewinnerSegmentOutput.emit(gewinnerSegment);
  }

  private winkelFuerIndex(index: number): number {
    const segmente = this.anzahlSegmente();
    if (!segmente) {
      return 0;
    }
    const winkelEinesSegments = 360 / segmente;
    return index * winkelEinesSegments + winkelEinesSegments / 2;
  }
}
