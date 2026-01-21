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
  | 'lieblingszauber'
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
  name: string;
  werte: string[];
}

export const SEGMENT_GRUPPEN: SegmentGruppe[] = [
  {
    id: 'default',
    name: '@JorgensonYT',
    werte: [
      'Einen wunderschönen guten Tag',
      "Kümmerliche Vorstellung",
      'https://www.youtube.com/@JorgensonYT',
    ]
  },
  {
    id: 'herkunft',
    name: 'Herkunft',
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
    name: 'Fraktion / Gilde',
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
    name: 'Stärke',
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
    name: 'Geschick',
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
    name: 'Magiebegabung?',
    werte: [
      "Ja",
      "Nein"
    ]
  },
  {
    id: 'magiekreis',
    name: 'Magiekreis',
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
    id: 'lieblingszauber',
    name: 'Lieblingszauber',
    werte: [
      "Licht",
      "Heilung",
      "Feuerpfeil",
      "Feuerball",
      "Feuersturm",
      "Feuerregen",
      "Schlaf",
      "Windfaust",
      "Telekinese",
      "Pyrokinese",
      "Kontrolle",
      "Sturmfaust",
      "Eispfeil",
      "Eisblock",
      "Kugelblitz",
      "Blitz",
      "Eiswelle",
      "Todeshauch"
    ]
  },
  {
    id: 'alter',
    name: 'Alter',
    werte: [
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
    name: 'Nahkampf?',
    werte: [
      "Ja",
      "Nein"
    ]
  },
  {
    id: 'nahkampfwaffe',
    name: 'Nahkampfwaffe',
    werte: [
      "Ulu-mulu",
      "Roter Wind",
      "Schädelspalter",
      "Knochenbrecher",
      "Streitkolben",
      "Stachelkeule",
      "Blutfliegenstachel",
      "Stahlzunge",
      "Morgenstern",
      "Stahlgeflecht",
      "Steinbrecher",
      "Grobes Schwert",
      "Richtschwert",
      "Gardeschwert",
      "Kampfschwert",
      "Kriegsschwert",
      "Schlächter",
      "Vollstrecker",
      "Berserkerwort",
      "Breitschwert",
      "Kriegerurteil",
      "Sturmgeflüster",
      "Gardistenhand",
      "Langschwert",
      "Furchtbringer",
      "Hassbringer",
      "Siegbringer",
      "Todbringer",
      "Kurzschwert",
      "Bauernwehr",
      "Buddlerzucht",
      "Orkhammer",
      "Kriegshammer",
      "Götterhammer",
      "rostiger Zweihänder",
      "Streitaxt",
      "Kriegerstimme",
      "Babarenfaust",
      "Trollfaust",
      "Donnerschlag",
      "Zweihänder",
      "Heldenschneide",
      "Blutschneide",
      "schwerer Zweihänder",
      "Zornstahl",
      "Grimmstahl",
      "Rachestahl",
      "leichter Zweihänder",
      "Hüterklinge",
      "Söldnerklinge",
      "Königsklinge",
    ]
  },
  {
    id: 'nahkampffertigkeit',
    name: 'Nahkampf-Fertigkeit',
    werte: [
      "Anfänger",
      "Kämpfer",
      "Meister"
    ]
  },
  {
    id: 'fernkampf',
    name: 'Fernkampf',
    werte: [
      "Ja",
      "Nein"
    ]
  },
  {
    id: 'fernkampfwaffe',
    name: 'Fernkampfwaffe',
    werte: [
      "Drachenjägerarmbrust",
      "Schwere Armbrust",
      "Kriegsarmbrust",
      "Armbrust",
      "Leichte Armbrust",
      "Dragomirs Armbrust",
      "Jagdarmbrust",
      "Armbrust",
      "Sengraths Armbrust",
      "Drachenbogen",
      "Kriegsbogen",
      "Eichenbogen",
      "Knochenbogen",
      "Buchenbogen",
      "Langbogen",
      "Eschenbogen",
      "Kompositbogen",
      "Ulmenbogen",
      "Jagdbogen",
      "Bospers Jagdbogen",
      "Weidenbogen",
      "Bogen",
      "Kurzbogen"
    ]
  },
  {
    id: 'fernkampffertigkeit',
    name: 'Fernkampf-Fertigkeit',
    werte: [
      "Anfänger",
      "Kämpfer",
      "Meister"
    ]
  },
  {
    id: 'goettergabe',
    name: 'Göttergabe',
    werte: [
      "Segen",
      "Fluch",
      "Keine"
    ]
  },
  {
    id: 'adanosfluch',
    name: 'Adanos-Fluch',
    werte: [
      "Segen",
      "Fluch",
      "Keine"
    ]
  },
  {
    id: 'adanossegen',
    name: 'Adanos-Segen',
    werte: [
      "Segen",
      "Fluch",
      "Keine"
    ]
  },
  {
    id: 'innossegen',
    name: 'Innos-Segen',
    werte: [
      "Segen",
      "Fluch",
      "Keine"
    ]
  },
  {
    id: 'innosfluch',
    name: 'Innos-Fluch',
    werte: [
      "Segen",
      "Fluch",
      "Keine"
    ]
  }, {
    id: 'beliarsegen',
    name: 'Beliar-Segen',
    werte: [
      "Segen",
      "Fluch",
      "Keine"
    ]
  },
  {
    id: 'beliarfluch',
    name: 'Beliar-Fluch',
    werte: [
      "Segen",
      "Fluch",
      "Keine"
    ]
  },
  {
    id: 'gott',
    name: 'Gott',
    werte: [
      "Innos",
      "Adanos",
      "Beliar",
    ]
  },
  {
    id: 'mission',
    name: 'Mission / Lebensziel',
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
      "Klaue Y'Berion eine Palmenfrau",
      "Rutsche den Erzhaufen herunter",
      "Werde der beste Freund von Mud"
    ]
  }

];
