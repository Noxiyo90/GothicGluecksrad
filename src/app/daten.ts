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
      "40",
      "140",
      "80",
      "20",
      "160",
      "60",
      "180",
      "120",
      "100",
      "200"
    ]
  },
  {
    id: 'geschick',
    name: 'Geschick',
    werte: [
      "40",
      "140",
      "80",
      "20",
      "160",
      "60",
      "180",
      "120",
      "100",
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
      "30",
      "90",
      "50",
      "40",
      "20",
      "70",
      "100",
      "60",
      "110",
      "80",
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
      "Adanos Tränen (-20% Mana)",
      "Fluch des Gegenstroms (-15% Bewegungsgeschwindigkeit)",
      "Fluch der Gezeiten (+50% Größe bei Flut, -50% Größe bei Ebbe)",
      "Austrocknung (verliere jede Minute 5% Mana)",
      "Adanos' Sturheit (Du kannst nicht nein sagen)",
      "Adanos' Nachgeben (Du kannst nicht ja sagen)"
    ]
  },
  {
    id: 'adanossegen',
    name: 'Adanos-Segen',
    werte: [
      "Wasserwandeln (Du kannst über Wasser laufen)",
      "Segen der Weisheit (Bekomme jede Minute 5% Mana)",
      "Mit der Strömung (+15% Bewegungsgeschwindigkeit)",
      "Adanoswesen (Du kannst dich 5 Meter näher an wilde Tiere nähern, ohne Reaktionen auszulösen",
      "Innere Balance (+5% Mana, +5% Geschick, +5% Stärke)",
      "Macht der Gezeiten (+10% Schaden bei Regen)"
    ]
  },
  {
    id: 'innossegen',
    name: 'Innos-Segen',
    werte: [
      "Macht des Lichts (+10% Schaden bei Sonnenschein)",
      "Aura der Sonne (+10% Mana)",
      "Schild des Feuers (+10% Rüstungsschutz)",
      "Flammende Reinheit (Du bist immun gegen Gift)",
      "Lodernder Wille (+10% Leben)",
      "Segen der Bedürftigen (Du findest 10% mehr Gold)"
    ]
  },
  {
    id: 'innosfluch',
    name: 'Innos-Fluch',
    werte: [
      "Wesen des Tages (Du fängst in der Dunkelheit Feuer und bekommst pro Sekunde 1% Schaden)",
      "Innos Zorn (Menschen greifen dich mit erhöhter Wahrscheinlichkeit an)",
      "Gebrochener Wille (-20% Ausdauer)",
      "Verdorrte Kraft (Du bist nicht mehr in der Lage Zweihandwaffen zu führen)",
      "Seelenbrand (-10% Leben, -10% Mana)",
      "Scherge Beliars (Auf innosgeweihten Boden erblindest du)"
    ]
  }, {
    id: 'beliarsegen',
    name: 'Beliar-Segen',
    werte: [
      "Macht der Dunkelheit (+10% Schaden bei Nacht)",
      "Aderlass (Opfere 10% Leben für 10% Mana)",
      "Nachtsicht (Keine Sichteinschränkung in der Dunkelheit)",
      "Orksöldner (Orks greifen dich nicht an)",
      "Übermenschliche Kraft (+10% Stärke, +10% Leben, -10% Mana, -10% Geschick)",
      "Auf ewig gebunden (+10% auf alle Werte, nach dem Tod wirst du ein Untoter)"
    ]
  },
  {
    id: 'beliarfluch',
    name: 'Beliar-Fluch',
    werte: [
      "Wesen der Nacht (Sonnenlicht fügt dir pro Sekunde 1% Schaden zu)",
      "Beliars Gier (Jeder Erzbrocken des Charakters wird zu Stein)",
      "Geißel der Schwachen (-20% Stärke)",
      "Blutopfer (Du fügst mit jedem Treffer eine Blutung hinzu, bekommst jedoch auch mit jedem Treffer eine Blutung)",
      "Fluch der Ungeduld (Du kannst nicht stillstehen)",
      "Ewige Qual (Dir folgt immer ein Mud-Geist den nur du sehen kannst)"
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
