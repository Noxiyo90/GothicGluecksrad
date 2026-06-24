import { TestBed } from '@angular/core/testing';
import { SoundService } from './sound.service';

describe('SoundService', () => {
  let service: SoundService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoundService);
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
});
