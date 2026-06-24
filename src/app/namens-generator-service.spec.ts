import { TestBed } from '@angular/core/testing';
import { NamensGeneratorService } from './namens-generator-service';
import { BEINAMEN_GESCHICK, BEINAMEN_KOMBINATION, BEINAMEN_STAERKE, ORK_VORNAMEN, VORNAMEN } from './namen-daten';

import { CharacterData } from './daten';

describe('NamensGeneratorService', () => {
  let service: NamensGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NamensGeneratorService);
  });

  it('sollte erstellt werden', () => {
    expect(service).toBeTruthy();
  });

  // ─── Vorname ───────────────────────────────────────────────────────────────

  describe('Vorname', () => {
    it('gibt einen nicht-leeren String zurück', () => {
      const result = service.generiereNamen({ herkunft: 'Nordmar' });
      expect(result.trim().length).toBeGreaterThan(0);
    });

    it('Vorname für Nordmar kommt aus der Nordmar-Liste', () => {
      // Math.random auf 0 fixieren → immer erster Eintrag → deterministisch
      spyOn(Math, 'random').and.returnValue(0);
      const result = service.generiereNamen({ herkunft: 'Nordmar' });
      expect(VORNAMEN['Nordmar']).toContain(result);
    });

    it('Vorname für Varant kommt aus der Varant-Liste', () => {
      // 20 zufällige Durchläufe – alle müssen aus der richtigen Liste kommen
      for (let i = 0; i < 20; i++) {
        const name = service.generiereNamen({ herkunft: 'Varant' });
        const vorname = name.split(' ')[0];
        expect(VORNAMEN['Varant']).withContext(`Vorname "${vorname}" nicht in Varant-Liste`).toContain(vorname);
      }
    });

    it('Vorname für jede bekannte Herkunft kommt aus der richtigen Liste', () => {
      spyOn(Math, 'random').and.returnValue(0);
      Object.keys(VORNAMEN).forEach(herkunft => {
        const result = service.generiereNamen({ herkunft });
        const vorname = result.split(' ')[0];
        expect(VORNAMEN[herkunft]).withContext(`Herkunft: ${herkunft}`).toContain(vorname);
      });
    });

  });

  // ─── Beiname – kein Bonus ──────────────────────────────────────────────────

  describe('Beiname – kein Bonus', () => {
    const ohneBonus: CharacterData = { herkunft: 'Myrtana', staerke: '100', geschick: '100' };

    it('kein Beiname wenn beide Stats unter 200', () => {
      const result = service.generiereNamen(ohneBonus);
      const hatBeiname = [...BEINAMEN_STAERKE, ...BEINAMEN_GESCHICK, ...BEINAMEN_KOMBINATION]
        .some(b => result.endsWith(b));
      expect(hatBeiname).toBeFalse();
    });

    it('kein Beiname wenn Stats undefined', () => {
      const result = service.generiereNamen({ herkunft: 'Myrtana' });
      const hatBeiname = [...BEINAMEN_STAERKE, ...BEINAMEN_GESCHICK, ...BEINAMEN_KOMBINATION]
        .some(b => result.endsWith(b));
      expect(hatBeiname).toBeFalse();
    });

    it('kein Beiname bei Stärke 199', () => {
      const result = service.generiereNamen({ herkunft: 'Myrtana', staerke: '199' });
      const hatBeiname = BEINAMEN_STAERKE.some(b => result.endsWith(b));
      expect(hatBeiname).toBeFalse();
    });
  });

  // ─── Beiname – Stärke 200 ─────────────────────────────────────────────────

  describe('Beiname – Stärke 200', () => {
    const maxStaerke: CharacterData = { herkunft: 'Myrtana', staerke: '200', geschick: '100' };

    it('hat immer einen Beiname wenn Stärke = 200', () => {
      for (let i = 0; i < 10; i++) {
        const result = service.generiereNamen(maxStaerke);
        const hatBeiname = BEINAMEN_STAERKE.some(b => result.endsWith(b));
        expect(hatBeiname).withContext(`Kein Stärke-Beiname in: "${result}"`).toBeTrue();
      }
    });

    it('Beiname kommt ausschließlich aus dem Stärke-Pool', () => {
      spyOn(Math, 'random').and.returnValue(0);
      const result = service.generiereNamen(maxStaerke);
      const beiname = result.substring(result.indexOf(' ') + 1);
      expect(BEINAMEN_STAERKE).toContain(beiname);
      expect(BEINAMEN_GESCHICK).not.toContain(beiname);
      expect(BEINAMEN_KOMBINATION).not.toContain(beiname);
    });
  });

  // ─── Beiname – Geschick 200 ───────────────────────────────────────────────

  describe('Beiname – Geschick 200', () => {
    const maxGeschick: CharacterData = { herkunft: 'Myrtana', staerke: '100', geschick: '200' };

    it('hat immer einen Beiname wenn Geschick = 200', () => {
      for (let i = 0; i < 10; i++) {
        const result = service.generiereNamen(maxGeschick);
        const hatBeiname = BEINAMEN_GESCHICK.some(b => result.endsWith(b));
        expect(hatBeiname).withContext(`Kein Geschick-Beiname in: "${result}"`).toBeTrue();
      }
    });

    it('Beiname kommt ausschließlich aus dem Geschick-Pool', () => {
      spyOn(Math, 'random').and.returnValue(0);
      const result = service.generiereNamen(maxGeschick);
      const beiname = result.substring(result.indexOf(' ') + 1);
      expect(BEINAMEN_GESCHICK).toContain(beiname);
      expect(BEINAMEN_STAERKE).not.toContain(beiname);
      expect(BEINAMEN_KOMBINATION).not.toContain(beiname);
    });
  });

  // ─── Beiname – Kombination (beide 200) ───────────────────────────────────

  describe('Beiname – Kombination (Stärke 200 + Geschick 200)', () => {
    const maxBeide: CharacterData = { herkunft: 'Myrtana', staerke: '200', geschick: '200' };

    it('hat immer einen Beiname wenn beide Stats = 200', () => {
      for (let i = 0; i < 10; i++) {
        const result = service.generiereNamen(maxBeide);
        const hatBeiname = BEINAMEN_KOMBINATION.some(b => result.endsWith(b));
        expect(hatBeiname).withContext(`Kein Kombinations-Beiname in: "${result}"`).toBeTrue();
      }
    });

    it('Beiname kommt ausschließlich aus dem Kombinations-Pool', () => {
      spyOn(Math, 'random').and.returnValue(0);
      const result = service.generiereNamen(maxBeide);
      const beiname = result.substring(result.indexOf(' ') + 1);
      expect(BEINAMEN_KOMBINATION).toContain(beiname);
      expect(BEINAMEN_STAERKE).not.toContain(beiname);
      expect(BEINAMEN_GESCHICK).not.toContain(beiname);
    });
  });

  // ─── Ork-Namen ────────────────────────────────────────────────────────────

  describe('Ork-Namen', () => {
    it('Vorname kommt aus ORK_VORNAMEN wenn fraktion === Ork', () => {
      spyOn(Math, 'random').and.returnValue(0);
      const result = service.generiereNamen({ fraktion: 'Ork', herkunft: 'Myrtana' });
      expect(ORK_VORNAMEN).toContain(result.split(' ')[0]);
    });

    it('Vorname kommt nicht aus Herkunfts-Pool wenn fraktion === Ork', () => {
      for (let i = 0; i < 20; i++) {
        const result = service.generiereNamen({ fraktion: 'Ork', herkunft: 'Myrtana' });
        const vorname = result.split(' ')[0];
        expect(VORNAMEN['Myrtana']).not.toContain(vorname);
      }
    });

    it('normaler Herkunftsname wenn fraktion === Orksöldner', () => {
      for (let i = 0; i < 20; i++) {
        const result = service.generiereNamen({ fraktion: 'Orksöldner', herkunft: 'Nordmar' });
        const vorname = result.split(' ')[0];
        expect(VORNAMEN['Nordmar']).toContain(vorname);
      }
    });

    it('ORK_VORNAMEN hat mindestens 1 Eintrag', () => {
      expect(ORK_VORNAMEN.length).toBeGreaterThanOrEqual(1);
    });
  });

  // ─── Format ───────────────────────────────────────────────────────────────

  describe('Format', () => {
    it('Name ohne Beiname besteht aus genau einem Wort', () => {
      spyOn(Math, 'random').and.returnValue(0);
      const result = service.generiereNamen({ herkunft: 'Myrtana', staerke: '100' });
      // Vornamen sind immer einwortig – kein Leerzeichen erwartet
      expect(result.trim()).not.toContain(' ');
    });

    it('Name mit Beiname hat Format "Vorname Beiname"', () => {
      spyOn(Math, 'random').and.returnValue(0);
      const result = service.generiereNamen({ herkunft: 'Myrtana', staerke: '200', geschick: '100' });
      const vorname = result.split(' ')[0];
      const beiname = result.substring(vorname.length + 1);
      expect(VORNAMEN['Myrtana']).toContain(vorname);
      expect(BEINAMEN_STAERKE).toContain(beiname);
    });

    it('Beinamen-Pools haben alle genau 5 Einträge', () => {
      expect(BEINAMEN_STAERKE.length).toBe(5);
      expect(BEINAMEN_GESCHICK.length).toBe(5);
      expect(BEINAMEN_KOMBINATION.length).toBe(5);
    });

    it('jede Herkunft hat mindestens 50 Vornamen', () => {
      Object.entries(VORNAMEN).forEach(([herkunft, namen]) => {
        expect(namen.length).withContext(`Herkunft "${herkunft}"`).toBeGreaterThanOrEqual(50);
      });
    });
  });
});
