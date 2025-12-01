export type SegmentId = 'default' | 'gilde';

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
            'dummy'
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
