import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Settings } from './settings';
import { SettingsService } from '../settings.service';

describe('Settings', () => {
  let component: Settings;
  let fixture: ComponentFixture<Settings>;
  let settingsService: SettingsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Settings],
    }).compileComponents();

    fixture = TestBed.createComponent(Settings);
    component = fixture.componentInstance;
    settingsService = TestBed.inject(SettingsService);
    fixture.detectChanges();
  });

  it('wird erstellt', () => {
    expect(component).toBeTruthy();
  });

  describe('Modal', () => {
    it('ist initial geschlossen', () => {
      expect(component.offen()).toBeFalse();
    });

    it('öffnet sich beim Klick auf den Zahnrad-Button', () => {
      fixture.nativeElement.querySelector('button.settings-btn').click();
      expect(component.offen()).toBeTrue();
    });

    it('schließt sich beim zweiten Klick', () => {
      fixture.nativeElement.querySelector('button.settings-btn').click();
      fixture.nativeElement.querySelector('button.settings-btn').click();
      expect(component.offen()).toBeFalse();
    });
  });

  describe('Sound-Checkbox', () => {
    beforeEach(() => {
      component.offen.set(true);
      fixture.detectChanges();
    });

    it('Checkbox ist initial aktiviert', () => {
      const checkbox = fixture.nativeElement.querySelector('input[type="checkbox"]') as HTMLInputElement;
      expect(checkbox.checked).toBeTrue();
    });

    it('Checkbox spiegelt soundEnabled aus dem SettingsService wider', () => {
      settingsService.soundEnabled.set(false);
      fixture.detectChanges();
      const checkbox = fixture.nativeElement.querySelector('input[type="checkbox"]') as HTMLInputElement;
      expect(checkbox.checked).toBeFalse();
    });

    it('Klick auf Checkbox ändert soundEnabled im SettingsService', () => {
      const checkbox = fixture.nativeElement.querySelector('input[type="checkbox"]') as HTMLInputElement;
      checkbox.click();
      expect(settingsService.soundEnabled()).toBeFalse();
    });
  });
});
