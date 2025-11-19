import { TestBed } from '@angular/core/testing';

import { FarbenBerechnungService } from './farben-berechnung-service';

describe('FarbenBerechnungService', () => {
  let service: FarbenBerechnungService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FarbenBerechnungService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
