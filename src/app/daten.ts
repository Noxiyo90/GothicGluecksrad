export interface CharacterData {
  name?: string;
  herkunft?: string;
  fraktion?: string;
  staerke?: string;
  geschick?: string;
  magiebegabung?: string;
  magiekreis?: string;
  lieblingszauber?: string;
  alter?: string;
  nahkampf?: string;
  nahkampfwaffe?: string;
  nahkampffertigkeit?: string;
  fernkampf?: string;
  fernkampfwaffe?: string;
  fernkampffertigkeit?: string;
  goettergabe?: string;
  gott?: string;
  adanosfluch?: string;
  adanossegen?: string;
  innossegen?: string;
  innosfluch?: string;
  beliarsegen?: string;
  beliarfluch?: string;
  mission?: string;
}

export type SegmentId =
  'default'
  | 'fraktion'
  | 'herkunft'
  | 'staerke'
  | 'geschick'
  | 'magiebegabung'
  | 'magiekreis'
  | 'alter'
  | 'nahkampf'
  | 'nahkampfwaffe'
  | 'nahkampffertigkeit'
  | 'fernkampf'
  | 'fernkampfwaffe'
  | 'fernkampffertigkeit'
  | 'goettergabe'
  | 'adanosfluch'
  | 'adanossegen'
  | 'innossegen'
  | 'innosfluch'
  | 'beliarsegen'
  | 'beliarfluch'
  | 'gott'
  | 'mission';

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
    id: 'fraktion',
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
  },
  {
    id: 'staerke',
    werte: [
      "20",
      "40",
      "60",
      "80",
      "100",
      "120",
      "140",
      "160",
      "180",
      "200"
    ]
  },
  {
    id: 'geschick',
    werte: [
      "20",
      "40",
      "60",
      "80",
      "100",
      "120",
      "140",
      "160",
      "180",
      "200"
    ]
  },
  {
    id: 'magiebegabung',
    werte: [
      "Ja",
      "Nein"
    ]
  },
  {
    id: 'magiekreis',
    werte: [
      "Kreis 1",
      "Kreis 2",
      "Kreis 3",
      "Kreis 4",
      "Kreis 5",
      "Kreis 6",
    ]
  },
  {
    id: 'alter',
    werte: [
      "10",
      "20",
      "30",
      "40",
      "50",
      "60",
      "70",
      "80",
      "90",
      "100",
      "110",
    ]
  },
  {
    id: 'nahkampf',
    werte: [
      "Ja",
      "Nein"
    ]
  },
  {
    // TODO: Nahkampfwaffen einfügen
    id: 'nahkampfwaffe',
    werte: [
      "Zweihänder",
      "Einhänder"
    ]
  },
  {
    id: 'nahkampffertigkeit',
    werte: [
      "Anfänger",
      "Kämpfer",
      "Meister"
    ]
  },
  {
    id: 'fernkampf',
    werte: [
      "Ja",
      "Nein"
    ]
  },
  {
    // Todo: Fernkampfwaffen einfügen
    id: 'fernkampfwaffe',
    werte: [
      "Bogen",
      "Armbrust"
    ]
  },
  {
    id: 'fernkampffertigkeit',
    werte: [
      "Anfänger",
      "Kämpfer",
      "Meister"
    ]
  },
  {
    id: 'goettergabe',
    werte: [
      "Segen",
      "Fluch",
      "Keine"
    ]
  },
  {
    id: 'adanosfluch',
    werte: [
      "Segen",
      "Fluch",
      "Keine"
    ]
  },
  {
    id: 'adanossegen',
    werte: [
      "Segen",
      "Fluch",
      "Keine"
    ]
  },
  {
    id: 'innossegen',
    werte: [
      "Segen",
      "Fluch",
      "Keine"
    ]
  },
  {
    id: 'innosfluch',
    werte: [
      "Segen",
      "Fluch",
      "Keine"
    ]
  }, {
    id: 'beliarsegen',
    werte: [
      "Segen",
      "Fluch",
      "Keine"
    ]
  },
  {
    id: 'beliarfluch',
    werte: [
      "Segen",
      "Fluch",
      "Keine"
    ]
  },
  {
    id: 'gott',
    werte: [
      "Innos",
      "Adanos",
      "Beliar",
    ]
  },
  {
    id: 'mission',
    werte: [
      "Jage einen Schattenläufer mit Fäusten",
      "Erkunde den Nebelturm",
      "Stehle Gomez ein Lächeln",
      "Zähme ein Molerat zum Reiten",
      "Mache einen Snapper zum Vegetarier",
      "Sei die Hauptfigur in einem Let's Play von Jorgenson",
      "Finde Lesters Verstärkung",
      "Töte einen Drachen",
      "Werde Lehrling bei Constantino",
      "Sammle alle Waldbeeren auf Khorinis",
      "Laufe nackt durchs Orkgebiet",
      "Erwecke den Schläfer",
      "Stehle das Kassenbuch der Diebesgilde",
      "Erkunde die Ruinen von Jharkendar",
      "Bringe den Söldnern das Konzept von Hygiene näher",
    ]
  }

];
