import {Component, computed, signal, ViewChild} from '@angular/core';
import {Gluecksrad} from './gluecksrad/gluecksrad';
import {Auswahl} from './auswahl/auswahl';
import {CharacterData, SEGMENT_GRUPPEN} from './daten';
import {timeout} from 'rxjs';

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

  @ViewChild(Auswahl) auswahlComponent!: Auswahl;

  updateCharacterData(field: keyof CharacterData, value: string) {
    this.auswahlComponent.setField(field, value);
    setTimeout(() => {
      this.next()
    }, 1000)

  }

  next() {
    const sichtbare = this.auswahlComponent.aktiveFelder(); // Signal aufrufen
    const currentId = this.aktuelleId();
    const currentIndex = sichtbare.indexOf(currentId as keyof CharacterData);

    const nextIndex = (currentIndex + 1) % sichtbare.length;
    const nextId = sichtbare[nextIndex];

    this.aktuelleId.set(nextId);
  }


  prev() {
    const sichtbare = this.auswahlComponent.aktiveFelder();
    const currentId = this.aktuelleId();
    const currentIndex = sichtbare.indexOf(currentId as keyof CharacterData);

    const prevIndex = (currentIndex - 1 + sichtbare.length) % sichtbare.length;
    const prevId = sichtbare[prevIndex];

    this.aktuelleId.set(prevId);
  }

  gewinnerSegmentOutput($event: number) {
    const feld = this.aktuelleGruppe().id as keyof CharacterData;
    const wert = this.aktuelleGruppe().werte[$event];

    this.updateCharacterData(feld, wert);
  }

  startGame() {
    this.next()
  }
}
