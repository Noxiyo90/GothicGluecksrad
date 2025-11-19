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

  anzahlSegmente = input<number>(1)
  rotation = signal(0);

  gewinnerSegment = signal<number | null>(null);
  highlightWinner = signal(false);

  constructor(private farbenBerechnungService: FarbenBerechnungService) {}

  onDrehen() {
    this.highlightWinner.set(false)
    this.berechneNeueRotation()
    setTimeout(() => {
      this.berechneGewinnerSegment();
      this.highlightWinner.set(true);
    }, this.drehzeitMs + 50);
  }

  gradient = computed(() =>  {
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

    this.rotation.update((old) => old + delta);
  }

  private berechneGewinnerSegment() {
    const winkelEinesSegments = 360/this.anzahlSegmente()
    let gradModulo = ((this.rotation()-90) % 360);
    const relativ = 360 - gradModulo;
    const gewinnerSegment = Math.floor(relativ  / winkelEinesSegments);
    this.gewinnerSegment.set(gewinnerSegment);
    console.log('gewinnerSegment:', gewinnerSegment, 'gradModulo:', gradModulo, 'relativ:', relativ);
  }
}

/**
 * 5 Segmente
 * winkel eines Segments = 72
 * relativ = 288
 * gewinner Segment = 4
 *
 *
 *
 */
