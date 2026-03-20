import { TestBed } from '@angular/core/testing';
import { FarbenBerechnungService } from './farben-berechnung-service';

describe('FarbenBerechnungService', () => {
  let service: FarbenBerechnungService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FarbenBerechnungService);
  });

  it('sollte erstellt werden', () => {
    expect(service).toBeTruthy();
  });

  describe('buildSegmenteCssString – Grundstruktur', () => {
    it('gibt einen conic-gradient-String zurück', () => {
      const result = service.buildSegmenteCssString(4, null, false);
      expect(result).toMatch(/^conic-gradient\(/);
      expect(result).toMatch(/\)$/);
    });

    it('enthält die korrekte Anzahl an Segmenten', () => {
      for (const anzahl of [1, 2, 3, 6, 10]) {
        const result = service.buildSegmenteCssString(anzahl, null, false);
        const farben = [...result.matchAll(/hsl\([^)]+\)/g)];
        expect(farben.length).withContext(`anzahlSegmente=${anzahl}`).toBe(anzahl);
      }
    });

    it('beginnt bei 0deg', () => {
      const result = service.buildSegmenteCssString(4, null, false);
      expect(result).toContain('0deg');
    });

    it('endet bei 360deg', () => {
      const result = service.buildSegmenteCssString(4, null, false);
      expect(result).toContain('360deg');
    });

    it('einzelnes Segment umfasst den gesamten Kreis (0deg bis 360deg)', () => {
      const result = service.buildSegmenteCssString(1, null, false);
      expect(result).toContain('0deg 360deg');
    });

    it('Segmentgrenzen schließen nahtlos aneinander an', () => {
      const anzahl = 4;
      const result = service.buildSegmenteCssString(anzahl, null, false);
      const winkel = [...result.matchAll(/(\d+(?:\.\d+)?)deg/g)].map(m => parseFloat(m[1]));
      // Grad-Werte kommen in Paaren: start, end, start, end, ...
      // Jedes end muss gleich dem nächsten start sein
      for (let i = 1; i < winkel.length - 1; i += 2) {
        expect(winkel[i]).withContext(`Grenze bei Index ${i}`).toBe(winkel[i + 1]);
      }
    });
  });

  describe('buildSegmenteCssString – Gewinner-Highlighting', () => {
    it('Gewinner-Segment bekommt CSS-Variable als Farbe wenn highlightWinner=true', () => {
      const result = service.buildSegmenteCssString(4, 2, true);
      expect(result).toContain('var(--winner-h)');
      expect(result).toContain('var(--winner-s)');
      expect(result).toContain('var(--winner-l)');
    });

    it('keine CSS-Variable wenn highlightWinner=false', () => {
      const result = service.buildSegmenteCssString(4, 2, false);
      expect(result).not.toContain('var(--winner-h)');
    });

    it('keine CSS-Variable wenn gewinnerSegment=null, auch bei highlightWinner=true', () => {
      const result = service.buildSegmenteCssString(4, null, true);
      expect(result).not.toContain('var(--winner-h)');
    });

    it('genau ein Segment bekommt die Gewinner-Farbe', () => {
      const result = service.buildSegmenteCssString(6, 3, true);
      const winnerMatches = [...result.matchAll(/var\(--winner-h\)/g)];
      expect(winnerMatches.length).toBe(1);
    });
  });

  describe('keine benachbarten Duplikate', () => {
    function farbProSegment(cssString: string): string[] {
      return [...cssString.matchAll(/hsl\([^)]+\)/g)].map(m => m[0]);
    }

    it('hat keine gleichen Farben nebeneinander bei 7 Segmenten', () => {
      // Mehrfach testen, da die Palette zufällig erzeugt wird
      for (let i = 0; i < 10; i++) {
        const testService = new FarbenBerechnungService();
        const farben = farbProSegment(testService.buildSegmenteCssString(7, null, false));
        for (let j = 0; j < farben.length; j++) {
          const naechste = farben[(j + 1) % farben.length];
          expect(farben[j]).withContext(`Segment ${j} und ${(j + 1) % farben.length}`).not.toBe(naechste);
        }
      }
    });

    it('hat keine gleichen Farben nebeneinander bei 2 Segmenten', () => {
      for (let i = 0; i < 10; i++) {
        const testService = new FarbenBerechnungService();
        const farben = farbProSegment(testService.buildSegmenteCssString(2, null, false));
        expect(farben[0]).not.toBe(farben[1]);
      }
    });

    it('hat keine gleichen Farben nebeneinander bei 3 Segmenten', () => {
      for (let i = 0; i < 10; i++) {
        const testService = new FarbenBerechnungService();
        const farben = farbProSegment(testService.buildSegmenteCssString(3, null, false));
        for (let j = 0; j < farben.length; j++) {
          const naechste = farben[(j + 1) % farben.length];
          expect(farben[j]).withContext(`Segment ${j} und ${(j + 1) % farben.length}`).not.toBe(naechste);
        }
      }
    });

    it('verwendet ausschließlich Farben aus der Basis-Palette', () => {
      const farben = farbProSegment(service.buildSegmenteCssString(6, null, false));
      farben.forEach(f => {
        expect(service.BASEFARBEN).toContain(f);
      });
    });
  });
});
