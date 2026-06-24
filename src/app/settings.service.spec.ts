import { TestBed } from '@angular/core/testing';
import { SettingsService } from './settings.service';

describe('SettingsService', () => {
  let service: SettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SettingsService);
  });

  it('wird erstellt', () => {
    expect(service).toBeTruthy();
  });

  it('soundEnabled ist initial true', () => {
    expect(service.soundEnabled()).toBeTrue();
  });

  it('soundEnabled kann auf false gesetzt werden', () => {
    service.soundEnabled.set(false);
    expect(service.soundEnabled()).toBeFalse();
  });
});
