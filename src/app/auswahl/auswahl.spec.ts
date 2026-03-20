import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Auswahl } from './auswahl';

describe('Auswahl', () => {
  let component: Auswahl;
  let fixture: ComponentFixture<Auswahl>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Auswahl],
    }).compileComponents();

    fixture = TestBed.createComponent(Auswahl);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // ─── Initialer Zustand ──────────────────────────────────────────────────────

  describe('Initialer Zustand', () => {
    it('characterData ist initial leer', () => {
      expect(component.characterData()).toEqual({});
    });

    it('alle Sichtbarkeits-Felder sind initial false', () => {
      const s = component.sichtbarkeit();
      expect(s.magiekreis).toBeFalse();
      expect(s.lieblingszauber).toBeFalse();
      expect(s.nahkampfwaffe).toBeFalse();
      expect(s.nahkampffertigkeit).toBeFalse();
      expect(s.fernkampfwaffe).toBeFalse();
      expect(s.fernkampffertigkeit).toBeFalse();
      expect(s.gott).toBeFalse();
      expect(s.adanossegen).toBeFalse();
      expect(s.adanosfluch).toBeFalse();
      expect(s.innossegen).toBeFalse();
      expect(s.innosfluch).toBeFalse();
      expect(s.beliarsegen).toBeFalse();
      expect(s.beliarfluch).toBeFalse();
    });

    it('aktiveFelder enthält initial alle Basis-Felder', () => {
      const felder = component.aktiveFelder();
      expect(felder).toContain('herkunft');
      expect(felder).toContain('fraktion');
      expect(felder).toContain('alter');
      expect(felder).toContain('staerke');
      expect(felder).toContain('geschick');
      expect(felder).toContain('magiebegabung');
      expect(felder).toContain('nahkampf');
      expect(felder).toContain('fernkampf');
      expect(felder).toContain('goettergabe');
      expect(felder).toContain('mission');
    });

    it('aktiveFelder enthält initial keine bedingten Felder', () => {
      const felder = component.aktiveFelder();
      expect(felder).not.toContain('magiekreis');
      expect(felder).not.toContain('lieblingszauber');
      expect(felder).not.toContain('nahkampfwaffe');
      expect(felder).not.toContain('nahkampffertigkeit');
      expect(felder).not.toContain('fernkampfwaffe');
      expect(felder).not.toContain('fernkampffertigkeit');
      expect(felder).not.toContain('gott');
      expect(felder).not.toContain('adanossegen');
    });
  });

  // ─── setField ───────────────────────────────────────────────────────────────

  describe('setField', () => {
    it('setzt ein einzelnes Feld', () => {
      component.setField('herkunft', 'Nordmar');
      expect(component.characterData().herkunft).toBe('Nordmar');
    });

    it('überschreibt ein vorhandenes Feld', () => {
      component.setField('herkunft', 'Nordmar');
      component.setField('herkunft', 'Myrtana');
      expect(component.characterData().herkunft).toBe('Myrtana');
    });

    it('behält andere Felder beim Setzen eines neuen Feldes', () => {
      component.setField('herkunft', 'Nordmar');
      component.setField('fraktion', 'Paladin/Miliz');
      expect(component.characterData().herkunft).toBe('Nordmar');
      expect(component.characterData().fraktion).toBe('Paladin/Miliz');
    });
  });

  // ─── Sichtbarkeit: Magiebegabung ────────────────────────────────────────────

  describe('Sichtbarkeit: Magiebegabung', () => {
    it('Magiekreis ist sichtbar wenn Magiebegabung = Ja', () => {
      component.setField('magiebegabung', 'Ja');
      expect(component.sichtbarkeit().magiekreis).toBeTrue();
    });

    it('Magiekreis ist nicht sichtbar wenn Magiebegabung = Nein', () => {
      component.setField('magiebegabung', 'Nein');
      expect(component.sichtbarkeit().magiekreis).toBeFalse();
    });

    it('Lieblingszauber ist sichtbar wenn Magiebegabung = Ja und Magiekreis gesetzt', () => {
      component.setField('magiebegabung', 'Ja');
      component.setField('magiekreis', 'Kreis 3');
      expect(component.sichtbarkeit().lieblingszauber).toBeTrue();
    });

    it('Lieblingszauber ist nicht sichtbar wenn Magiekreis fehlt', () => {
      component.setField('magiebegabung', 'Ja');
      expect(component.sichtbarkeit().lieblingszauber).toBeFalse();
    });

    it('Lieblingszauber ist nicht sichtbar wenn Magiebegabung = Nein', () => {
      component.setField('magiebegabung', 'Nein');
      component.setField('magiekreis', 'Kreis 1');
      expect(component.sichtbarkeit().lieblingszauber).toBeFalse();
    });
  });

  // ─── Sichtbarkeit: Nahkampf ─────────────────────────────────────────────────

  describe('Sichtbarkeit: Nahkampf', () => {
    it('Nahkampfwaffe und -fertigkeit sind sichtbar wenn Nahkampf = Ja', () => {
      component.setField('nahkampf', 'Ja');
      expect(component.sichtbarkeit().nahkampfwaffe).toBeTrue();
      expect(component.sichtbarkeit().nahkampffertigkeit).toBeTrue();
    });

    it('Nahkampfwaffe und -fertigkeit sind nicht sichtbar wenn Nahkampf = Nein', () => {
      component.setField('nahkampf', 'Nein');
      expect(component.sichtbarkeit().nahkampfwaffe).toBeFalse();
      expect(component.sichtbarkeit().nahkampffertigkeit).toBeFalse();
    });
  });

  // ─── Sichtbarkeit: Fernkampf ────────────────────────────────────────────────

  describe('Sichtbarkeit: Fernkampf', () => {
    it('Fernkampfwaffe und -fertigkeit sind sichtbar wenn Fernkampf = Ja', () => {
      component.setField('fernkampf', 'Ja');
      expect(component.sichtbarkeit().fernkampfwaffe).toBeTrue();
      expect(component.sichtbarkeit().fernkampffertigkeit).toBeTrue();
    });

    it('Fernkampfwaffe und -fertigkeit sind nicht sichtbar wenn Fernkampf = Nein', () => {
      component.setField('fernkampf', 'Nein');
      expect(component.sichtbarkeit().fernkampfwaffe).toBeFalse();
      expect(component.sichtbarkeit().fernkampffertigkeit).toBeFalse();
    });
  });

  // ─── Sichtbarkeit: Göttergabe ───────────────────────────────────────────────

  describe('Sichtbarkeit: Göttergabe', () => {
    it('Gott wird angezeigt wenn Göttergabe = Segen', () => {
      component.setField('goettergabe', 'Segen');
      expect(component.sichtbarkeit().gott).toBeTrue();
    });

    it('Gott wird angezeigt wenn Göttergabe = Fluch', () => {
      component.setField('goettergabe', 'Fluch');
      expect(component.sichtbarkeit().gott).toBeTrue();
    });

    it('Gott wird nicht angezeigt wenn Göttergabe = Keine', () => {
      component.setField('goettergabe', 'Keine');
      expect(component.sichtbarkeit().gott).toBeFalse();
    });

    it('Adanos-Segen sichtbar bei Segen + Adanos, alle anderen Gottesfelder nicht', () => {
      component.setField('goettergabe', 'Segen');
      component.setField('gott', 'Adanos');
      const s = component.sichtbarkeit();
      expect(s.adanossegen).toBeTrue();
      expect(s.adanosfluch).toBeFalse();
      expect(s.innossegen).toBeFalse();
      expect(s.innosfluch).toBeFalse();
      expect(s.beliarsegen).toBeFalse();
      expect(s.beliarfluch).toBeFalse();
    });

    it('Adanos-Fluch sichtbar bei Fluch + Adanos, Segen nicht', () => {
      component.setField('goettergabe', 'Fluch');
      component.setField('gott', 'Adanos');
      const s = component.sichtbarkeit();
      expect(s.adanosfluch).toBeTrue();
      expect(s.adanossegen).toBeFalse();
    });

    it('Innos-Segen sichtbar bei Segen + Innos, alle anderen Gottesfelder nicht', () => {
      component.setField('goettergabe', 'Segen');
      component.setField('gott', 'Innos');
      const s = component.sichtbarkeit();
      expect(s.innossegen).toBeTrue();
      expect(s.innosfluch).toBeFalse();
      expect(s.adanossegen).toBeFalse();
      expect(s.beliarsegen).toBeFalse();
    });

    it('Innos-Fluch sichtbar bei Fluch + Innos, Segen nicht', () => {
      component.setField('goettergabe', 'Fluch');
      component.setField('gott', 'Innos');
      const s = component.sichtbarkeit();
      expect(s.innosfluch).toBeTrue();
      expect(s.innossegen).toBeFalse();
    });

    it('Beliar-Segen sichtbar bei Segen + Beliar, alle anderen Gottesfelder nicht', () => {
      component.setField('goettergabe', 'Segen');
      component.setField('gott', 'Beliar');
      const s = component.sichtbarkeit();
      expect(s.beliarsegen).toBeTrue();
      expect(s.beliarfluch).toBeFalse();
      expect(s.adanossegen).toBeFalse();
      expect(s.innossegen).toBeFalse();
    });

    it('Beliar-Fluch sichtbar bei Fluch + Beliar, Segen nicht', () => {
      component.setField('goettergabe', 'Fluch');
      component.setField('gott', 'Beliar');
      const s = component.sichtbarkeit();
      expect(s.beliarfluch).toBeTrue();
      expect(s.beliarsegen).toBeFalse();
    });
  });

  // ─── Reihenfolge der aktiven Felder ────────────────────────────────────────

  describe('aktiveFelder – Reihenfolge', () => {
    it('Magiekreis erscheint direkt nach Magiebegabung', () => {
      component.setField('magiebegabung', 'Ja');
      const felder = component.aktiveFelder();
      expect(felder.indexOf('magiekreis')).toBe(felder.indexOf('magiebegabung') + 1);
    });

    it('Lieblingszauber erscheint direkt nach Magiekreis', () => {
      component.setField('magiebegabung', 'Ja');
      component.setField('magiekreis', 'Kreis 2');
      const felder = component.aktiveFelder();
      expect(felder.indexOf('lieblingszauber')).toBe(felder.indexOf('magiekreis') + 1);
    });

    it('Nahkampfwaffe erscheint direkt nach Nahkampf', () => {
      component.setField('nahkampf', 'Ja');
      const felder = component.aktiveFelder();
      expect(felder.indexOf('nahkampfwaffe')).toBe(felder.indexOf('nahkampf') + 1);
    });

    it('Nahkampffertigkeit erscheint direkt nach Nahkampfwaffe', () => {
      component.setField('nahkampf', 'Ja');
      const felder = component.aktiveFelder();
      expect(felder.indexOf('nahkampffertigkeit')).toBe(felder.indexOf('nahkampfwaffe') + 1);
    });

    it('Fernkampfwaffe erscheint direkt nach Fernkampf', () => {
      component.setField('fernkampf', 'Ja');
      const felder = component.aktiveFelder();
      expect(felder.indexOf('fernkampfwaffe')).toBe(felder.indexOf('fernkampf') + 1);
    });

    it('Fernkampffertigkeit erscheint direkt nach Fernkampfwaffe', () => {
      component.setField('fernkampf', 'Ja');
      const felder = component.aktiveFelder();
      expect(felder.indexOf('fernkampffertigkeit')).toBe(felder.indexOf('fernkampfwaffe') + 1);
    });

    it('Gott erscheint direkt nach Göttergabe', () => {
      component.setField('goettergabe', 'Segen');
      const felder = component.aktiveFelder();
      expect(felder.indexOf('gott')).toBe(felder.indexOf('goettergabe') + 1);
    });

    it('Adanos-Segen erscheint direkt nach Gott', () => {
      component.setField('goettergabe', 'Segen');
      component.setField('gott', 'Adanos');
      const felder = component.aktiveFelder();
      expect(felder.indexOf('adanossegen')).toBe(felder.indexOf('gott') + 1);
    });

    it('Adanos-Fluch erscheint direkt nach Gott', () => {
      component.setField('goettergabe', 'Fluch');
      component.setField('gott', 'Adanos');
      const felder = component.aktiveFelder();
      expect(felder.indexOf('adanosfluch')).toBe(felder.indexOf('gott') + 1);
    });

    it('jedes Feld kommt nur einmal vor', () => {
      component.setField('nahkampf', 'Ja');
      component.setField('magiebegabung', 'Ja');
      component.setField('magiekreis', 'Kreis 1');
      component.setField('goettergabe', 'Segen');
      component.setField('gott', 'Innos');
      const felder = component.aktiveFelder();
      const einzigartig = new Set(felder);
      expect(felder.length).toBe(einzigartig.size);
    });
  });

  // ─── Template ──────────────────────────────────────────────────────────────

  describe('Template', () => {
    it('zeigt — für alle leeren Felder', () => {
      const values = (fixture.nativeElement as HTMLElement).querySelectorAll('.field-value');
      values.forEach(v => expect(v.textContent?.trim()).toBe('—'));
    });

    it('zeigt den gesetzten Herkunft-Wert', () => {
      component.setField('herkunft', 'Nordmar');
      fixture.detectChanges();
      expect((fixture.nativeElement as HTMLElement).textContent).toContain('Nordmar');
    });

    it('Magiekreis-Feld erscheint im DOM wenn Magiebegabung = Ja', () => {
      component.setField('magiebegabung', 'Ja');
      fixture.detectChanges();
      const labels = Array.from((fixture.nativeElement as HTMLElement).querySelectorAll('.field-label'));
      expect(labels.some(l => l.textContent?.includes('Magiekreis'))).toBeTrue();
    });

    it('Magiekreis-Feld fehlt im DOM wenn Magiebegabung = Nein', () => {
      component.setField('magiebegabung', 'Nein');
      fixture.detectChanges();
      const labels = Array.from((fixture.nativeElement as HTMLElement).querySelectorAll('.field-label'));
      expect(labels.some(l => l.textContent?.includes('Magiekreis'))).toBeFalse();
    });

    it('Nahkampfwaffe erscheint im DOM wenn Nahkampf = Ja', () => {
      component.setField('nahkampf', 'Ja');
      fixture.detectChanges();
      const labels = Array.from((fixture.nativeElement as HTMLElement).querySelectorAll('.field-label'));
      expect(labels.some(l => l.textContent?.includes('Nahkampfwaffe'))).toBeTrue();
    });

    it('Nahkampfwaffe fehlt im DOM wenn Nahkampf = Nein', () => {
      component.setField('nahkampf', 'Nein');
      fixture.detectChanges();
      const labels = Array.from((fixture.nativeElement as HTMLElement).querySelectorAll('.field-label'));
      expect(labels.some(l => l.textContent?.includes('Nahkampfwaffe'))).toBeFalse();
    });

    it('Gott-Feld erscheint im DOM wenn Göttergabe = Fluch', () => {
      component.setField('goettergabe', 'Fluch');
      fixture.detectChanges();
      const labels = Array.from((fixture.nativeElement as HTMLElement).querySelectorAll('.field-label'));
      expect(labels.some(l => l.textContent?.trim() === 'Gott')).toBeTrue();
    });

    it('Gott-Feld fehlt im DOM wenn Göttergabe = Keine', () => {
      component.setField('goettergabe', 'Keine');
      fixture.detectChanges();
      const labels = Array.from((fixture.nativeElement as HTMLElement).querySelectorAll('.field-label'));
      expect(labels.some(l => l.textContent?.trim() === 'Gott')).toBeFalse();
    });
  });

  // ─── reset() ──────────────────────────────────────────────────────────────

  describe('reset()', () => {
    it('leert characterData vollständig', () => {
      component.setField('herkunft', 'Nordmar');
      component.setField('fraktion', 'Paladin/Miliz');
      component.setField('staerke', '200');
      component.reset();
      expect(component.characterData()).toEqual({});
    });

    it('entfernt bedingte Felder aus aktiveFelder', () => {
      component.setField('nahkampf', 'Ja');
      component.setField('magiebegabung', 'Ja');
      component.setField('magiekreis', 'Kreis 1');
      component.aktiveFelder(); // Felder befüllen
      component.reset();
      const felder = component.aktiveFelder();
      expect(felder).not.toContain('nahkampfwaffe');
      expect(felder).not.toContain('nahkampffertigkeit');
      expect(felder).not.toContain('magiekreis');
      expect(felder).not.toContain('lieblingszauber');
    });

    it('stellt die Basis-Felder in der ursprünglichen Reihenfolge wieder her', () => {
      component.setField('nahkampf', 'Ja');
      component.aktiveFelder();
      component.reset();
      const felder = component.aktiveFelder();
      const nahkampfIdx = felder.indexOf('nahkampf');
      const fernkampfIdx = felder.indexOf('fernkampf');
      expect(nahkampfIdx).toBeLessThan(fernkampfIdx);
      expect(felder.indexOf('nahkampfwaffe')).toBe(-1);
    });

    it('alle Sichtbarkeiten sind nach reset() false', () => {
      component.setField('magiebegabung', 'Ja');
      component.setField('nahkampf', 'Ja');
      component.setField('goettergabe', 'Segen');
      component.reset();
      const s = component.sichtbarkeit();
      expect(s.magiekreis).toBeFalse();
      expect(s.nahkampfwaffe).toBeFalse();
      expect(s.gott).toBeFalse();
    });
  });
});
