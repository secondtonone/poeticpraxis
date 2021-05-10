export default class MelodyMaker {
    static Tone = null;
    static Instrument = null;
    baseUrl = './';

    instruments: {
        piano: any;
        poly: any;
    } = {
        piano: this.Piano,
        poly: this.PolySynth,
    };

    static async getToneModule(promise: () => Promise<any>): Promise<any> {
        if(!MelodyMaker.Tone) MelodyMaker.Tone = await promise();
    }

    getInstrument(inst: string = 'piano'): any {
        if (inst && this.instruments[inst] && !MelodyMaker.Instrument) {
            return this.instruments[inst]();
        }
    }

    Piano(): Promise<any> {
        MelodyMaker.Instrument = new MelodyMaker.Tone.Sampler(
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
                baseUrl: this.baseUrl,
            }
        );
    
        return new Promise((resolve) => {
            MelodyMaker.Tone.Buffer.on('load', () => resolve(MelodyMaker.Instrument));
        });
    }

    PolySynth(): Promise<any> {
        MelodyMaker.Instrument = new MelodyMaker.Tone.PolySynth(8, MelodyMaker.Tone.Synth, {
            oscillator: {
                partials: [0, 2, 3, 4],
            },
        });
    
        return new Promise((resolve) => {
            resolve(MelodyMaker.Instrument);
        });
    }
}
