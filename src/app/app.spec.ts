import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { App } from './app';
import { CharacterData, SEGMENT_GRUPPEN } from './daten';

describe('App', () => {
  let component: App;
  let fixture: ComponentFixture<App>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // ─── Initialer Zustand ──────────────────────────────────────────────────────

  describe('Initialer Zustand', () => {
    it('startet mit der Default-Gruppe', () => {
      expect(component.aktuelleId()).toBe('default');
    });

    it('aktuelleGruppe() gibt die Default-Gruppe zurück', () => {
      expect(component.aktuelleGruppe().id).toBe('default');
    });

    it('aktuelleGruppe() gibt immer eine Gruppe mit Werten zurück', () => {
      expect(component.aktuelleGruppe().werte.length).toBeGreaterThan(0);
    });

    it('started ist initial false', () => {
      expect(component.started()).toBeFalse();
    });
  });

  // ─── startGame() ────────────────────────────────────────────────────────────

  describe('startGame()', () => {
    it('wechselt von der Default-Gruppe zur ersten echten Gruppe', () => {
      component.startGame();
      expect(component.aktuelleId()).not.toBe('default');
    });

    it('wechselt zur Herkunft-Gruppe als erstes Feld', () => {
      component.startGame();
      // herkunft ist das erste Feld in aktiveFelder()
      expect(component.aktuelleId()).toBe('herkunft');
    });
  });

  // ─── Spielfluss: nächste Gruppe ─────────────────────────────────────────────

  describe('Spielfluss', () => {
    it('gewinnerSegmentOutput() setzt den Wert im CharacterData', fakeAsync(() => {
      component.startGame(); // aktuelleId = 'herkunft'
      fixture.detectChanges();

      // Segment 0 der Herkunft-Gruppe = 'Nordmar'
      component.gewinnerSegmentOutput(0);
      tick(1000);
      fixture.detectChanges();

      expect(component.auswahlComponent.characterData().herkunft).toBe('Nordmar');
    }));

    it('gewinnerSegmentOutput() wechselt nach 1 Sekunde zur nächsten Gruppe', fakeAsync(() => {
      component.startGame(); // aktuelleId = 'herkunft'
      fixture.detectChanges();

      component.gewinnerSegmentOutput(0);
      expect(component.aktuelleId()).toBe('herkunft'); // noch nicht gewechselt

      tick(1000);
      expect(component.aktuelleId()).not.toBe('herkunft'); // jetzt gewechselt
    }));

    it('next() bleibt in den aktiveFelder() und wechselt nicht auf ein ungültiges Feld', fakeAsync(() => {
      component.startGame();
      fixture.detectChanges();

      // Alle Basis-Felder durchlaufen
      const felder = component.auswahlComponent.aktiveFelder();
      for (let i = 0; i < felder.length; i++) {
        component.gewinnerSegmentOutput(0);
        tick(1000);
        fixture.detectChanges();
        expect(felder).toContain(component.aktuelleId() as keyof CharacterData);
      }
    }));

    it('aktuelleGruppe() gibt für jedes aktive Feld eine passende SEGMENT_GRUPPE zurück', fakeAsync(() => {
      component.startGame();
      fixture.detectChanges();

      const bekannteIds = SEGMENT_GRUPPEN.map(g => g.id);
      expect(bekannteIds).toContain(component.aktuelleGruppe().id);

      component.gewinnerSegmentOutput(0);
      tick(1000);
      fixture.detectChanges();

      expect(bekannteIds).toContain(component.aktuelleGruppe().id);
    }));
  });
});
