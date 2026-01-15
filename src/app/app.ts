import {Component, computed, signal} from '@angular/core';
import {Gluecksrad} from './gluecksrad/gluecksrad';
import {Auswahl} from './auswahl/auswahl';
import {SEGMENT_GRUPPEN, SegmentGruppe} from './daten';

@Component({
  selector: 'app-root',
  imports: [Gluecksrad, Auswahl],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  alleGruppen = SEGMENT_GRUPPEN;

  aktuelleId = signal<string>('default');

  started = signal<boolean>(false);

  aktuelleGruppe = computed(() =>
    this.alleGruppen.find(g => g.id === this.aktuelleId()) ?? this.alleGruppen[0]
  );

  next() {
    const currentIndex = this.alleGruppen.findIndex(g => g.id === this.aktuelleId());
    const nextIndex = (currentIndex + 1) % this.alleGruppen.length;
    this.aktuelleId.set(this.alleGruppen[nextIndex].id);
  }

  prev() {
    const currentIndex = this.alleGruppen.findIndex(g => g.id === this.aktuelleId());
    const prevIndex = (currentIndex - 1 + this.alleGruppen.length) % this.alleGruppen.length;
    this.aktuelleId.set(this.alleGruppen[prevIndex].id);
  }

  start() {
    this.aktuelleId.set('herkunft');
    this.started.set(true);
  }
}
