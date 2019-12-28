import { Tone, mapLetterNote } from './tone';

const timeNotation = (time) =>
    `${Math.floor(time.length / 2)}m${time.length % 2 ? '+2n' : ''}`;

const makeLetterGramma = ({ notesCount, strings, elements, orderStrings }) => {
    let music = [];

    let time = [];

    let index = 0;

    orderStrings.forEach((stringId) => {
        let soundGramma = [];

        strings[stringId].steps.forEach((step) => {
            soundGramma = [...soundGramma, ...step];
        });

        soundGramma = soundGramma.concat(['p','p']);

        soundGramma.forEach((tokenId) => {
            let duration = '2n';
            let vowelNotes = [];

            if (tokenId === 'p' || elements[tokenId].type === 'p') {
                time.push(duration);
            } else if (elements[tokenId].type === 'v') {
                duration = '2n';
                const isAccented = elements[tokenId].accent === 1;
                const char = elements[tokenId].char.toLowerCase();

                const notes = mapLetterNote[char];

                if (isAccented) {
                    //duration = 0.75;
                }

                notes.main.forEach((note, index) => {
                    if (index < notesCount) {
                        vowelNotes.push({
                            note,
                            duration,
                            notation: Tone.Frequency(note, 'hz').toNote()
                        });
                    }
                });

                music.push({
                    string: stringId,
                    isAccented,
                    char: char,
                    time: timeNotation(time), //time.toFixed(2),
                    vowelNotes,
                    index
                });

                ++index;

                time.push(duration);
            }
        });
    });
    
    return { music, time: timeNotation(time) };
};

export { makeLetterGramma };
