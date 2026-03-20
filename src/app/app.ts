import {Component, computed, effect, signal, ViewChild} from '@angular/core';
import {Gluecksrad} from './gluecksrad/gluecksrad';
import {Auswahl} from './auswahl/auswahl';
import {CharacterData, SEGMENT_GRUPPEN} from './daten';

@Component({
  selector: 'app-root',
  imports: [Gluecksrad, Auswahl],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
// TODO: Modal Pip
export class App {
  alleGruppen = SEGMENT_GRUPPEN;

  aktuelleId = signal<string>('default');

  started = signal<boolean>(false);
  oeffneModal = signal(false);

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

  constructor() {
    effect(() => {
      if (!this.auswahlComponent) return;
      const mission = this.auswahlComponent.characterData().mission;

      if (mission && mission.trim().length > 0) {
        this.oeffneModal.set(true);
      }
    });
  }

  next() {
    const sichtbare = this.auswahlComponent.aktiveFelder(); // Signal aufrufen
    const currentId = this.aktuelleId();
    const currentIndex = sichtbare.indexOf(currentId as keyof CharacterData);

    const nextIndex = (currentIndex + 1) % sichtbare.length;
    const nextId = sichtbare[nextIndex];

    this.aktuelleId.set(nextId);
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
