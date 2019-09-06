import { Tone, mapLetterNote } from './tone';

const makeLetterGramma = ({ notesCount, strings, elements, orderStrings }) => {
    let music = [];

    let time = 0;

    let index = 0;

    orderStrings.forEach((stringId) => {
        let soundGramma = [];

        strings[stringId].steps.forEach((step) => {
            soundGramma = [...soundGramma, ...step, 'p'];
        });

        soundGramma.forEach((tokenId) => {
            let duration = 0.3;
            let vowelNotes = [];

            if (tokenId === 'p' || elements[tokenId].type === 'p') {
                time = time + duration;
            } else if (elements[tokenId].type === 'v') {
                duration = 0.1;
                const isAccented = elements[tokenId].accent === 1;
                const char = elements[tokenId].char.toLowerCase();

                const notes = mapLetterNote[char];

                if (isAccented) {
                    duration = 0.3;

                    vowelNotes.push({
                        note: notes.tone,
                        duration
                    });
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
                    time: time.toFixed(2),
                    vowelNotes,
                    index
                });

                ++index;

                time = time + duration;
            }
        });
    });

    return { music, time };
};

export { makeLetterGramma };
