import { Component, computed, Inject, signal, ViewChild } from '@angular/core';
import { SoundService } from './sound.service';
import { DOCUMENT } from '@angular/common';
import { Gluecksrad } from './gluecksrad/gluecksrad';
import { Auswahl } from './auswahl/auswahl';
import { CharakterModal } from './charakter-modal/charakter-modal';
import { Settings } from './settings/settings';
import { CharacterData, SEGMENT_GRUPPEN } from './daten';
import { NamensGeneratorService } from './namens-generator-service';

@Component({
  selector: 'app-root',
  imports: [Gluecksrad, Auswahl, CharakterModal, Settings],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  alleGruppen = SEGMENT_GRUPPEN;

  aktuelleId = signal<string>('default');
  started = signal<boolean>(false);
  oeffneModal = signal(false);
  generierterName = signal<string>('');

  aktuelleGruppe = computed(() =>
    this.alleGruppen.find(g => g.id === this.aktuelleId()) ?? this.alleGruppen[0]
  );

  @ViewChild(Auswahl) auswahlComponent!: Auswahl;
  @ViewChild(Gluecksrad) gluecksradComponent!: Gluecksrad;
  private updateTimeoutId: ReturnType<typeof setTimeout> | null = null;

  constructor(
    private namensGeneratorService: NamensGeneratorService,
    private soundService: SoundService,
    @Inject(DOCUMENT) document: Document,
  ) {
    document.body.style.backgroundImage = "url('images/links.png')";
  }

  updateCharacterData(field: keyof CharacterData, value: string) {
this.auswahlComponent.setField(field, value);
    if (field === 'mission') {
      this.generierterName.set(
        this.namensGeneratorService.generiereNamen(this.auswahlComponent.characterData())
      );
      this.oeffneModal.set(true);
    }
    this.updateTimeoutId = setTimeout(() => {
      this.updateTimeoutId = null;
      this.next();
    }, 1000);
  }

  next() {
    const sichtbare = this.auswahlComponent.aktiveFelder();
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
    this.next();
  }

  neuStarten() {
    if (this.updateTimeoutId !== null) {
      clearTimeout(this.updateTimeoutId);
      this.updateTimeoutId = null;
    }
    this.gluecksradComponent.resetAnimation();
    this.soundService.stopAll();
    this.auswahlComponent.reset();
    this.aktuelleId.set('default');
    this.generierterName.set('');
    this.oeffneModal.set(false);
  }
}
