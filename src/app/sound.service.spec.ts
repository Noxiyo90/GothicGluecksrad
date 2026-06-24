import { TestBed } from '@angular/core/testing';
import { SoundService } from './sound.service';
import { SettingsService } from './settings.service';

describe('SoundService', () => {
  let service: SoundService;
  let settingsService: SettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoundService);
    settingsService = TestBed.inject(SettingsService);
  });

  it('wird erstellt', () => {
    expect(service).toBeTruthy();
  });

  it('playRattle() wirft keinen Fehler bei gültigen Parametern', () => {
    expect(() => service.playRattle(4000, 8, 1800, 0)).not.toThrow();
  });

  it('playRattle() wirft keinen Fehler bei 0 Segmenten', () => {
    expect(() => service.playRattle(4000, 0, 1800, 0)).not.toThrow();
  });

  it('playStop() wirft keinen Fehler', () => {
    expect(() => service.playStop()).not.toThrow();
  });

  it('playStop() wirft keinen Fehler wenn soundEnabled false ist', () => {
    settingsService.soundEnabled.set(false);
    expect(() => service.playStop()).not.toThrow();
  });

  it('stopAll() setzt audioContext auf null zurück', () => {
    service.playRattle(4000, 8, 1800, 0); // AudioContext initialisieren
    service.stopAll();
    expect((service as any).audioContext).toBeNull();
  });

  it('playRattle() spielt keinen Sound wenn soundEnabled false ist', () => {
    settingsService.soundEnabled.set(false);
    const ctx = (service as any).getContext();
    spyOn(ctx, 'createBufferSource').and.callThrough();
    service.playRattle(4000, 8, 1800, 0);
    expect(ctx.createBufferSource).not.toHaveBeenCalled();
  });
});
