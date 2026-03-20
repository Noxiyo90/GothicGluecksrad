import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CharakterModal } from './charakter-modal';
import { CharacterData } from '../daten';

const VOLLER_CHARAKTER: CharacterData = {
  herkunft: 'Nordmar',
  fraktion: 'Paladin/Miliz',
  alter: '40',
  staerke: '120',
  geschick: '80',
  magiebegabung: 'Ja',
  magiekreis: 'Kreis 3',
  lieblingszauber: 'Feuerball',
  nahkampf: 'Ja',
  nahkampfwaffe: 'Kriegsschwert',
  nahkampffertigkeit: 'Meister',
  fernkampf: 'Nein',
  goettergabe: 'Segen',
  gott: 'Innos',
  innossegen: 'Schild des Feuers (+10% Rüstungsschutz)',
  mission: 'Töte einen Drachen',
};

const MINIMALER_CHARAKTER: CharacterData = {
  herkunft: 'Myrtana',
  fraktion: 'Söldner',
  alter: '30',
  staerke: '100',
  geschick: '60',
  magiebegabung: 'Nein',
  nahkampf: 'Nein',
  fernkampf: 'Nein',
  goettergabe: 'Keine',
  mission: 'Zähme ein Molerat zum Reiten',
};

describe('CharakterModal', () => {
  let component: CharakterModal;
  let fixture: ComponentFixture<CharakterModal>;

  function setup(data: CharacterData, name = 'Harek Trolltöter') {
    fixture.componentRef.setInput('characterData', data);
    fixture.componentRef.setInput('name', name);
    fixture.detectChanges();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharakterModal],
    }).compileComponents();

    fixture = TestBed.createComponent(CharakterModal);
    component = fixture.componentInstance;
  });

  // ─── Name als Überschrift ─────────────────────────────────────────────────

  describe('Name', () => {
    it('zeigt den generierten Namen als Überschrift', () => {
      setup(MINIMALER_CHARAKTER, 'Lothar der Starke');
      const heading = (fixture.nativeElement as HTMLElement).querySelector('h1, h2, [data-testid="charakter-name"]');
      expect(heading?.textContent?.trim()).toBe('Lothar der Starke');
    });

    it('zeigt auch einfache Namen ohne Beiname korrekt', () => {
      setup(MINIMALER_CHARAKTER, 'Lothar');
      const heading = (fixture.nativeElement as HTMLElement).querySelector('h1, h2, [data-testid="charakter-name"]');
      expect(heading?.textContent?.trim()).toBe('Lothar');
    });
  });

  // ─── Nur ausgefüllte Felder ───────────────────────────────────────────────

  describe('Angezeigte Felder', () => {
    it('zeigt Herkunft wenn gesetzt', () => {
      setup(MINIMALER_CHARAKTER);
      expect((fixture.nativeElement as HTMLElement).textContent).toContain('Myrtana');
    });

    it('zeigt Fraktion wenn gesetzt', () => {
      setup(MINIMALER_CHARAKTER);
      expect((fixture.nativeElement as HTMLElement).textContent).toContain('Söldner');
    });

    it('zeigt Mission wenn gesetzt', () => {
      setup(MINIMALER_CHARAKTER);
      expect((fixture.nativeElement as HTMLElement).textContent).toContain('Zähme ein Molerat zum Reiten');
    });

    it('zeigt Magiekreis wenn Magiebegabung = Ja', () => {
      setup(VOLLER_CHARAKTER);
      expect((fixture.nativeElement as HTMLElement).textContent).toContain('Kreis 3');
    });

    it('zeigt Lieblingszauber wenn gesetzt', () => {
      setup(VOLLER_CHARAKTER);
      expect((fixture.nativeElement as HTMLElement).textContent).toContain('Feuerball');
    });

    it('zeigt Nahkampfwaffe wenn Nahkampf = Ja', () => {
      setup(VOLLER_CHARAKTER);
      expect((fixture.nativeElement as HTMLElement).textContent).toContain('Kriegsschwert');
    });

    it('zeigt Nahkampffertigkeit wenn Nahkampf = Ja', () => {
      setup(VOLLER_CHARAKTER);
      expect((fixture.nativeElement as HTMLElement).textContent).toContain('Meister');
    });

    it('zeigt Göttergabe-Segen wenn gesetzt', () => {
      setup(VOLLER_CHARAKTER);
      expect((fixture.nativeElement as HTMLElement).textContent).toContain('Schild des Feuers');
    });
  });

  // ─── Nicht gesetzte Felder werden ausgeblendet ────────────────────────────

  describe('Ausgeblendete Felder', () => {
    it('zeigt kein Magiekreis-Label wenn Magiebegabung = Nein', () => {
      setup(MINIMALER_CHARAKTER);
      expect((fixture.nativeElement as HTMLElement).textContent).not.toContain('Magiekreis');
    });

    it('zeigt kein Nahkampfwaffe-Label wenn Nahkampf = Nein', () => {
      setup(MINIMALER_CHARAKTER);
      expect((fixture.nativeElement as HTMLElement).textContent).not.toContain('Nahkampfwaffe');
    });

    it('zeigt kein Fernkampfwaffe-Label wenn Fernkampf = Nein', () => {
      setup(MINIMALER_CHARAKTER);
      expect((fixture.nativeElement as HTMLElement).textContent).not.toContain('Fernkampfwaffe');
    });

    it('zeigt kein Gott-Label wenn Göttergabe = Keine', () => {
      setup(MINIMALER_CHARAKTER);
      expect((fixture.nativeElement as HTMLElement).textContent).not.toContain('Gott');
    });

    it('zeigt keinen Innos-Segen wenn Gott = Adanos', () => {
      const data: CharacterData = {
        ...VOLLER_CHARAKTER,
        gott: 'Adanos',
        adanossegen: 'Wasserwandeln (Du kannst über Wasser laufen)',
        innossegen: undefined,
      };
      setup(data);
      expect((fixture.nativeElement as HTMLElement).textContent).not.toContain('Segen Innos');
    });
  });

  // ─── Neu starten ─────────────────────────────────────────────────────────

  describe('Neu starten', () => {
    it('hat einen "Neu starten"-Button', () => {
      setup(MINIMALER_CHARAKTER);
      const buttons = Array.from((fixture.nativeElement as HTMLElement).querySelectorAll('button'));
      expect(buttons.some(b => b.textContent?.includes('Neu starten'))).toBeTrue();
    });

    it('"Neu starten" emittiert das neuStarten-Event', () => {
      setup(MINIMALER_CHARAKTER);
      spyOn(component.neuStarten, 'emit');
      const button = Array.from((fixture.nativeElement as HTMLElement).querySelectorAll('button'))
        .find(b => b.textContent?.includes('Neu starten'))!;
      button.click();
      expect(component.neuStarten.emit).toHaveBeenCalled();
    });
  });
});
