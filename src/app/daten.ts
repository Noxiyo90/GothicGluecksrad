export type SegmentId = 'default' | 'gilde';

export interface SegmentGruppe {
  id: SegmentId;
  werte: string[];
}

export const SEGMENT_GRUPPEN: SegmentGruppe[] = [
  {
    id: 'default',
    werte: [
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      '11',
      '12',
      '13',
      '14',
      '15',
      '16',
      '17',
      '18',
      '19',
      '20',
      // 'Einen wunderschönen guten Tag',
      // "Kümmerliche Vorstellung",
      // 'https://www.youtube.com/@JorgensonYT',
      // 'dummy',
      // 'Finnley'
    ]
  }, {
    id: 'gilde',
    werte: [
      "Eins",
      "Zwei",
      "Drei"
    ]
  }

];
