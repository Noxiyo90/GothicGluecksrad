import { Injectable } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Injectable({ providedIn: 'root' })
export class PdfExportService {
  private html2canvasFn = html2canvas;

  async exportiere(element: HTMLElement, name: string): Promise<void> {
    const canvas = await this.html2canvasFn(element, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdfWidth = 210; // mm (A4 Breite)
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: [pdfWidth, pdfHeight] });
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${name}.pdf`);
  }
}
