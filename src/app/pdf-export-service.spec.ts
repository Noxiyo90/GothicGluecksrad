import { TestBed } from '@angular/core/testing';
import { PdfExportService } from './pdf-export-service';

describe('PdfExportService', () => {
  let service: PdfExportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PdfExportService);
  });

  it('ist erstellbar', () => {
    expect(service).toBeTruthy();
  });

  it('hat eine exportiere()-Methode', () => {
    expect(typeof service.exportiere).toBe('function');
  });

  it('exportiere() gibt ein Promise zurück', () => {
    spyOn(service as any, 'html2canvasFn').and.returnValue(
      Promise.resolve(document.createElement('canvas'))
    );
    const result = service.exportiere(document.createElement('div'), 'Test');
    expect(result).toBeInstanceOf(Promise);
    result.catch(() => {});
  });
});
