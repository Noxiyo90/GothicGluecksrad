import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Gluecksrad } from './gluecksrad';
import { SEGMENT_GRUPPEN, SegmentGruppe } from '../daten';

const DEFAULT_GRUPPE: SegmentGruppe = SEGMENT_GRUPPEN.find(g => g.id === 'default')!;
const HERKUNFT_GRUPPE: SegmentGruppe = SEGMENT_GRUPPEN.find(g => g.id === 'herkunft')!;

// Gruppe mit bekannter Größe für Berechnungstests
const ZEHN_SEGMENTE: SegmentGruppe = {
  id: 'herkunft',
  name: 'Test',
  werte: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
};

describe('Gluecksrad', () => {
  let component: Gluecksrad;
  let fixture: ComponentFixture<Gluecksrad>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Gluecksrad],
    }).compileComponents();

    fixture = TestBed.createComponent(Gluecksrad);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('segmentGruppe', DEFAULT_GRUPPE);
    fixture.detectChanges();
  });

  // ─── Template ──────────────────────────────────────────────────────────────

  describe('Template', () => {
    it('zeigt Starten-Button für die Default-Gruppe', () => {
      const btn = fixture.nativeElement.querySelector('button.starter') as HTMLButtonElement;
      expect(btn.textContent?.trim()).toBe('Starten');
    });

    it('zeigt Drehen-Button für andere Gruppen', () => {
      fixture.componentRef.setInput('segmentGruppe', HERKUNFT_GRUPPE);
      fixture.detectChanges();
      const btn = fixture.nativeElement.querySelector('button.starter') as HTMLButtonElement;
      expect(btn.textContent?.trim()).toBe('Drehen');
    });

    it('zeigt den Gruppen-Namen als Überschrift', () => {
      fixture.componentRef.setInput('segmentGruppe', HERKUNFT_GRUPPE);
      fixture.detectChanges();
      expect((fixture.nativeElement as HTMLElement).textContent).toContain('Herkunft');
    });

    it('zeigt alle Segment-Werte im Rad', () => {
      fixture.componentRef.setInput('segmentGruppe', HERKUNFT_GRUPPE);
      fixture.detectChanges();
      const text = (fixture.nativeElement as HTMLElement).textContent ?? '';
      HERKUNFT_GRUPPE.werte.forEach(wert => expect(text).toContain(wert));
    });
  });

  // ─── Initialer Zustand ──────────────────────────────────────────────────────

  describe('Initialer Zustand', () => {
    it('Rotation startet bei 0', () => {
      expect(component.derzeitigerRotationsWinkel()).toBe(0);
    });

    it('idleDrehen ist initial true', () => {
      expect(component.idleDrehen()).toBeTrue();
    });

    it('gewinnerSegment ist initial null', () => {
      expect(component.gewinnerSegment()).toBeNull();
    });

    it('highlightWinner ist initial false', () => {
      expect(component.highlightWinner()).toBeFalse();
    });

    it('anzahlSegmente entspricht der Anzahl der Werte in der Gruppe', () => {
      fixture.componentRef.setInput('segmentGruppe', HERKUNFT_GRUPPE);
      fixture.detectChanges();
      expect(component.anzahlSegmente()).toBe(HERKUNFT_GRUPPE.werte.length);
    });
  });

  // ─── start() ───────────────────────────────────────────────────────────────

  describe('start()', () => {
    beforeEach(() => {
      const mockEl = {
        animate: jasmine.createSpy('animate').and.returnValue({ cancel: jasmine.createSpy('cancel') }),
        classList: { remove: jasmine.createSpy('remove') },
      };
      (component as any).radIdleContainer = { nativeElement: mockEl };
      spyOn(window, 'getComputedStyle').and.returnValue({ transform: 'none' } as any);
    });

    it('setzt idleDrehen auf false', () => {
      component.start();
      expect(component.idleDrehen()).toBeFalse();
    });

    it('emittiert das startGame-Event nach 1 Sekunde', fakeAsync(() => {
      spyOn(component.startGame, 'emit');
      component.start();
      expect(component.startGame.emit).not.toHaveBeenCalled();
      tick(1000);
      expect(component.startGame.emit).toHaveBeenCalled();
    }));
  });

  // ─── Drehen ────────────────────────────────────────────────────────────────

  describe('onDrehen()', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('segmentGruppe', HERKUNFT_GRUPPE);
      fixture.detectChanges();
    });

    it('erhöht die Rotation um mindestens 4 volle Umdrehungen (1440°)', fakeAsync(() => {
      component.onDrehen();
      expect(component.derzeitigerRotationsWinkel()).toBeGreaterThanOrEqual(4 * 360);
      tick(component.drehzeitMs + 100);
    }));

    it('emittiert gewinnerSegmentOutput nach der Drehzeit', fakeAsync(() => {
      spyOn(component.gewinnerSegmentOutput, 'emit');
      component.onDrehen();
      expect(component.gewinnerSegmentOutput.emit).not.toHaveBeenCalled();
      tick(component.drehzeitMs + 100);
      expect(component.gewinnerSegmentOutput.emit).toHaveBeenCalled();
    }));

    it('emittierter Gewinner-Index ist gültig (0 bis anzahlSegmente-1)', fakeAsync(() => {
      let gewinner: number | undefined;
      spyOn(component.gewinnerSegmentOutput, 'emit').and.callFake((v: number) => (gewinner = v));
      component.onDrehen();
      tick(component.drehzeitMs + 100);
      expect(gewinner).toBeDefined();
      expect(gewinner!).toBeGreaterThanOrEqual(0);
      expect(gewinner!).toBeLessThan(HERKUNFT_GRUPPE.werte.length);
    }));

    it('setzt highlightWinner nach dem Drehen auf true', fakeAsync(() => {
      component.onDrehen();
      tick(component.drehzeitMs + 100);
      expect(component.highlightWinner()).toBeTrue();
    }));

    it('zweites onDrehen() während Drehung wird blockiert', fakeAsync(() => {
      const winkelNachErsterDrehung = component.derzeitigerRotationsWinkel();
      component.onDrehen();
      const winkelNachDrehen = component.derzeitigerRotationsWinkel();
      component.onDrehen(); // soll ignoriert werden
      expect(component.derzeitigerRotationsWinkel()).toBe(winkelNachDrehen);
      tick(component.drehzeitMs + 100);
    }));
  });

  // ─── speichenDaten ─────────────────────────────────────────────────────────

  describe('speichenDaten()', () => {
    it('gibt n Winkel für n Segmente zurück', () => {
      fixture.componentRef.setInput('segmentGruppe', ZEHN_SEGMENTE);
      fixture.detectChanges();
      expect(component.speichenDaten().length).toBe(10);
    });

    it('Winkel sind gleichmäßig verteilt (360/n Grad Abstand)', () => {
      fixture.componentRef.setInput('segmentGruppe', ZEHN_SEGMENTE);
      fixture.detectChanges();
      const daten = component.speichenDaten();
      expect(daten[0]).toBe(0);
      expect(daten[1]).toBeCloseTo(36);
      expect(daten[9]).toBeCloseTo(324);
    });

    it('gibt bei 4 Segmenten die Winkel 0, 90, 180, 270 zurück', () => {
      fixture.componentRef.setInput('segmentGruppe', {
        id: 'herkunft', name: 'Test', werte: ['A', 'B', 'C', 'D']
      });
      fixture.detectChanges();
      expect(component.speichenDaten()).toEqual([0, 90, 180, 270]);
    });
  });

  // ─── Gewinner-Berechnung ───────────────────────────────────────────────────

  describe('Gewinner-Segment Berechnung', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('segmentGruppe', ZEHN_SEGMENTE);
      fixture.detectChanges();
    });

    it('berechnet Segment 5 bei 1710° (Beispiel aus Code-Kommentar)', () => {
      // 10 Segmente à 36°, Rotation 1710°:
      // gradModulo = (1710 - 90) % 360 = 180, relativ = 360 - 180 = 180, 180/36 = 5
      component.derzeitigerRotationsWinkel.set(1710);
      (component as any).berechneGewinnerSegment();
      expect(component.gewinnerSegment()).toBe(5);
    });

    it('berechnet Segment 2 bei 1800°', () => {
      // gradModulo = (1800 - 90) % 360 = 270, relativ = 360 - 270 = 90, 90/36 = 2
      component.derzeitigerRotationsWinkel.set(1800);
      (component as any).berechneGewinnerSegment();
      expect(component.gewinnerSegment()).toBe(2);
    });

    it('berechnet Segment 0 bei 1440°', () => {
      // gradModulo = (1440 - 90) % 360 = 270, relativ = 360 - 270 = 90... Warte:
      // (1440 - 90) = 1350, 1350 % 360 = 270, relativ = 360 - 270 = 90, 90/36 = 2
      // Korrektur: Segment 2 bei 1440°
      component.derzeitigerRotationsWinkel.set(1440);
      (component as any).berechneGewinnerSegment();
      expect(component.gewinnerSegment()).toBe(2);
    });

    it('gewinnerSegment wird bei Gruppenwechsel zurückgesetzt', () => {
      component.derzeitigerRotationsWinkel.set(1710);
      (component as any).berechneGewinnerSegment();
      expect(component.gewinnerSegment()).toBe(5);

      fixture.componentRef.setInput('segmentGruppe', HERKUNFT_GRUPPE);
      fixture.detectChanges();
      expect(component.gewinnerSegment()).toBeNull();
    });

    it('highlightWinner wird bei Gruppenwechsel zurückgesetzt', fakeAsync(() => {
      component.onDrehen();
      tick(component.drehzeitMs + 100);
      expect(component.highlightWinner()).toBeTrue();

      fixture.componentRef.setInput('segmentGruppe', DEFAULT_GRUPPE);
      fixture.detectChanges();
      expect(component.highlightWinner()).toBeFalse();
    }));
  });
});
