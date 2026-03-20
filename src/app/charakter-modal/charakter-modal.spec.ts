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

  // ─── Gruppierung ──────────────────────────────────────────────────────────

  describe('Gruppierung', () => {
    it('gibt 5 Gruppen zurück wenn alle Felder gesetzt sind', () => {
      setup(VOLLER_CHARAKTER);
      expect(component.gruppen().length).toBe(5);
    });

    it('erste Gruppe hat den Titel "Herkunft & Identität"', () => {
      setup(VOLLER_CHARAKTER);
      expect(component.gruppen()[0].titel).toBe('Herkunft & Identität');
    });

    it('"Herkunft & Identität" enthält Herkunft, Fraktion und Alter', () => {
      setup(VOLLER_CHARAKTER);
      const labels = component.gruppen()[0].felder.map(f => f.label);
      expect(labels).toContain('Herkunft');
      expect(labels).toContain('Fraktion / Gilde');
      expect(labels).toContain('Alter');
    });

    it('"Kampf & Fähigkeiten" enthält Stärke und Geschick', () => {
      setup(VOLLER_CHARAKTER);
      const kampfGruppe = component.gruppen().find(g => g.titel === 'Kampf & Fähigkeiten')!;
      const labels = kampfGruppe.felder.map(f => f.label);
      expect(labels).toContain('Stärke');
      expect(labels).toContain('Geschick');
    });

    it('Magie-Gruppe fehlt wenn keine Magie-Felder gesetzt sind', () => {
      const data: CharacterData = {
        herkunft: 'Nordmar',
        mission: 'Töte einen Drachen',
      };
      setup(data);
      const gruppenTitel = component.gruppen().map(g => g.titel);
      expect(gruppenTitel).not.toContain('Magie');
    });

    it('"Kampf & Fähigkeiten" hat 3 Unter-Zeilen wenn alle Felder gefüllt sind', () => {
      setup(VOLLER_CHARAKTER);
      const kampf = component.gruppen().find(g => g.titel === 'Kampf & Fähigkeiten')!;
      expect(kampf.unterGruppen.length).toBe(3);
    });

    it('erste Unter-Zeile enthält nur Stärke und Geschick', () => {
      setup(VOLLER_CHARAKTER);
      const kampf = component.gruppen().find(g => g.titel === 'Kampf & Fähigkeiten')!;
      const labels = kampf.unterGruppen[0].map(f => f.label);
      expect(labels).toContain('Stärke');
      expect(labels).toContain('Geschick');
      expect(labels).not.toContain('Nahkampf');
    });

    it('zweite Unter-Zeile enthält Nahkampf-Felder', () => {
      setup(VOLLER_CHARAKTER);
      const kampf = component.gruppen().find(g => g.titel === 'Kampf & Fähigkeiten')!;
      const labels = kampf.unterGruppen[1].map(f => f.label);
      expect(labels).toContain('Nahkampf');
      expect(labels).toContain('Nahkampfwaffe');
      expect(labels).not.toContain('Fernkampf');
    });

    it('dritte Unter-Zeile enthält Fernkampf-Felder', () => {
      setup(VOLLER_CHARAKTER);
      const kampf = component.gruppen().find(g => g.titel === 'Kampf & Fähigkeiten')!;
      const labels = kampf.unterGruppen[2].map(f => f.label);
      expect(labels).toContain('Fernkampf');
      expect(labels).not.toContain('Nahkampf');
    });

    it('Unter-Zeile ohne gefüllte Felder wird nicht ausgegeben', () => {
      const data: CharacterData = { nahkampf: 'Ja', nahkampfwaffe: 'Schwert' };
      setup(data);
      const kampf = component.gruppen().find(g => g.titel === 'Kampf & Fähigkeiten')!;
      expect(kampf.unterGruppen.length).toBe(1);
      expect(kampf.unterGruppen[0].map(f => f.label)).toContain('Nahkampf');
    });

    it('letzte Gruppe ist immer "Mission"', () => {
      setup(VOLLER_CHARAKTER);
      const gruppen = component.gruppen();
      expect(gruppen[gruppen.length - 1].titel).toBe('Mission');
    });

    it('Gruppen-Überschriften erscheinen im Template', () => {
      setup(VOLLER_CHARAKTER);
      const text = (fixture.nativeElement as HTMLElement).textContent!;
      expect(text).toContain('Herkunft & Identität');
      expect(text).toContain('Kampf & Fähigkeiten');
      expect(text).toContain('Magie');
      expect(text).toContain('Göttliche Gabe');
      expect(text).toContain('Mission');
    });

    it('Gruppe ohne ausgefüllte Felder wird nicht gerendert', () => {
      const data: CharacterData = {
        herkunft: 'Nordmar',
        mission: 'Töte einen Drachen',
      };
      setup(data);
      const text = (fixture.nativeElement as HTMLElement).textContent!;
      expect(text).not.toContain('Magie');
      expect(text).not.toContain('Kampf & Fähigkeiten');
      expect(text).not.toContain('Göttliche Gabe');
    });
  });

  // ─── Layout ───────────────────────────────────────────────────────────────

  describe('Layout', () => {
    it('zeigt 6 Trennlinien bei 5 Gruppen (nach Name, zwischen Gruppen, vor Button)', () => {
      setup(VOLLER_CHARAKTER);
      const hrs = (fixture.nativeElement as HTMLElement).querySelectorAll('hr.pergament-linie');
      expect(hrs.length).toBe(6);
    });

    it('zeigt 3 Trennlinien bei 2 Gruppen', () => {
      const data: CharacterData = { herkunft: 'Nordmar', mission: 'Töte einen Drachen' };
      setup(data);
      const hrs = (fixture.nativeElement as HTMLElement).querySelectorAll('hr.pergament-linie');
      expect(hrs.length).toBe(3);
    });

    it('Felder-Grid hat 3 Spalten', () => {
      setup(VOLLER_CHARAKTER);
      const grid = (fixture.nativeElement as HTMLElement).querySelector('.felder-grid') as HTMLElement;
      expect(getComputedStyle(grid).gridTemplateColumns.split(' ').length).toBe(3);
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
