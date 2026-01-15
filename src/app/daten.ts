export type SegmentId = 'default' | 'fraktionen' | 'herkunft';

export interface SegmentGruppe {
  id: SegmentId;
  werte: string[];
}

export const SEGMENT_GRUPPEN: SegmentGruppe[] = [
  {
    id: 'default',
    werte: [
      'Einen wunderschönen guten Tag',
      "Kümmerliche Vorstellung",
      'https://www.youtube.com/@JorgensonYT',
      'Der Entwickler dieser App hasst CSS',
      // 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
    ]
  },
  {
    id: 'herkunft',
    werte: [
      "Nordmar",
      "Myrtana",
      "Varant",
      "Südliche Inseln",
      "Khorinis Stadt und Umland",
      "Khorinis Minental",
      "Archolos",
      "Irdorath",
      "Jharkendar"
    ]
  },
  {
    id: 'fraktionen',
    werte: [
      "Feuermagier",
      "Wassermagier",
      "Schwarzmagier",
      "Altes Lager",
      "Neues Lager",
      "Sumpf Lager",
      "Ork",
      "Orksöldner",
      "Paladin/Miliz",
      "Nordmar Wolfsclan",
      "Nordmar Feuerclan",
      "Nordmar Hammerclan",
      "Söldner",
      "Banditen",
      "Piraten",
      "Rebellen",
      "Assassinen",
      "Nomaden",
      "Druiden",
      "Waldläufer"
    ]
  }

];
