export let Tone = null;
export let Instrument = null;
const diaposons = {
    low: 4,
    high: 7
};
const fileNames = ['C', 'Ds', 'Fs', 'A'];
const instruments = {
    piano: Piano
};

const audioPath = './';

let isSamplesLoaded = false;

export function getSamples(path = audioPath) {
    if (isSamplesLoaded) {
        return Promise.resolve();
    }
    let files = [];
    let ext = 'mp3';
    for (let value = diaposons.low; value <= diaposons.high; value++) {
        fileNames.forEach((name) => {
            files.push(fetch(`${path}${name}${value}.${ext}`));
        });
    }
    return Promise.all(files).then(() => {
        isSamplesLoaded = true;
    });
}

export function getToneModule() {
    return import(/* webpackChunkName: "Tone" */ 'tone').then(
        (ToneModule) => (Tone = ToneModule)
    );
}

export function Piano() {
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
            C4: 'C4.[mp3|ogg]',/* * */
            'D#4': 'Ds4.[mp3|ogg]',/* * */
            'F#4': 'Fs4.[mp3|ogg]',/* * */
            A4: 'A4.[mp3|ogg]', /* * */
            /* C5: 'C5.[mp3|ogg]',
            'D#5': 'Ds5.[mp3|ogg]', */
            'F#5': 'Fs5.[mp3|ogg]', /* * */
            A5: 'A5.[mp3|ogg]', /* * */
            /* C6: 'C6.[mp3|ogg]', */
            'D#6': 'Ds6.[mp3|ogg]', /* * */
            'F#6': 'Fs6.[mp3|ogg]', /* * */
            A6: 'A6.[mp3|ogg]', /* * */
            C7: 'C7.[mp3|ogg]', /* * */
            'D#7': 'Ds7.[mp3|ogg]', /* * */
            'F#7': 'Fs7.[mp3|ogg]', /* * */
            /* A7: 'A7.[mp3|ogg]' ,
            C8: 'C8.[mp3|ogg]' */
        },
        {
            release: 1,
            baseUrl: './'
        }
    );

    
    

    return new Promise((resolve) => {
        Tone.Buffer.on('load', () => resolve(Instrument));
    });
}

export function getInstrument(inst = 'piano') {
    if (inst) {
        return instruments[inst]();
    }
}

export const mapLetterNote = {
    а: { tone: 116, main: [755, 1360, 2500] },
    е: { tone: 122, main: [385, 2025, 2700] },
    у: { tone: 135, main: [305, 975, 2715] },
    и: { tone: 136, main: [290, 2190, 2865] },
    о: { tone: 122, main: [440, 825, 2495] },
    ы: { tone: 130, main: [285, 1655, 2465] },
    э: { tone: 120, main: [465, 1750, 2450] },
    ё: { tone: 120, main: [390, 1200, 1940] },
    ю: { tone: 130, main: [300, 800, 1975] },
    я: { tone: 118, main: [780, 1490, 2400] }
};
