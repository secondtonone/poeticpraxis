export let Tone: any = null;
export let Instrument: any = null;

const instruments: {
    piano: any;
    poly: any;
} = {
    piano: Piano,
    poly: PolySynth,
};

const baseUrl: string = './';

export function getToneModule(): Promise<any> {
    return import(/* webpackChunkName: "Tone" */ 'tone').then(
        (ToneModule) => (Tone = ToneModule)
    );
}

export function PolySynth(): Promise<any> {
    Instrument = new Tone.PolySynth(8, Tone.Synth, {
        oscillator: {
            partials: [0, 2, 3, 4],
        },
    });

    return new Promise((resolve) => {
        resolve(Instrument);
    });
}

export function Piano(): Promise<any> {
    Instrument = new Tone.Sampler(
        {
            /* A0: 'A0.[mp3|ogg]',
            C1: 'C1.[mp3|ogg]',
            'D#1': 'Ds1.[mp3|ogg]',
            'F#1': 'Fs1.[mp3|ogg]',
            A1: 'A1.[mp3|ogg]', */
            /* C2: 'C2.[mp3|ogg]',
            'D#2': 'Ds2.[mp3|ogg]', */
            /* 'F#2': 'Fs2.[mp3|ogg]',
            A2: 'A2.[mp3|ogg]',
            C3: 'C3.[mp3|ogg]',
            'D#3': 'Ds3.[mp3|ogg]',
            'F#3': 'Fs3.[mp3|ogg]',
            A3: 'A3.[mp3|ogg]', */
            C4: 'C4.[mp3|ogg]' /* * */,
            'D#4': 'Ds4.[mp3|ogg]' /* * */,
            'F#4': 'Fs4.[mp3|ogg]' /* * */,
            A4: 'A4.[mp3|ogg]' /* * */,
            /* C5: 'C5.[mp3|ogg]',
            'D#5': 'Ds5.[mp3|ogg]', */
            'F#5': 'Fs5.[mp3|ogg]' /* * */,
            A5: 'A5.[mp3|ogg]' /* * */,
            /* C6: 'C6.[mp3|ogg]', */
            'D#6': 'Ds6.[mp3|ogg]' /* * */,
            'F#6': 'Fs6.[mp3|ogg]' /* * */,
            A6: 'A6.[mp3|ogg]' /* * */,
            C7: 'C7.[mp3|ogg]' /* * */,
            'D#7': 'Ds7.[mp3|ogg]' /* * */,
            'F#7': 'Fs7.[mp3|ogg]' /* * */,
            /* A7: 'A7.[mp3|ogg]' ,
            C8: 'C8.[mp3|ogg]' */
        },
        {
            release: 1,
            baseUrl,
        }
    );

    return new Promise((resolve) => {
        Tone.Buffer.on('load', () => resolve(Instrument));
    });
}

export function getInstrument(inst: string = 'piano'): any {
    if (inst && instruments[inst]) {
        return instruments[inst]();
    }
}
