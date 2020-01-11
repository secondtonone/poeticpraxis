import { Tone, mapLetterNote } from './tone';
/* длительность двух строк - 3.5
*  в строках 15 гласных на одну 0.23с = 230мс
*  120 бпм 1/4 ноты в минуту
*/
const stepSoundMultiply = (step, elements) => {
    return step.map((tokenId) => {
        return {
            tokenId,
            sound: elements[tokenId].accent === 1 ? 4 : 0
        };
    });
};
const makeLetterGramma = ({ notesCount, strings, elements, orderStrings }) => {
    let music = [];

    let time = 0;

    let index = 0;

    orderStrings.forEach((stringId) => {
        let soundGramma = [];

        strings[stringId].steps.forEach((step) => {
            const modded = stepSoundMultiply(step, elements);
            soundGramma = [...soundGramma, ...modded];
        });

        console.log(soundGramma);
        

        soundGramma = soundGramma.concat([{ tokenId: 'p' }, { tokenId: 'p' }]);

        soundGramma.forEach(({tokenId, sound}) => {
            let duration = 0.38;
            let vowelNotes = [];

            if (tokenId === 'p' || elements[tokenId].type === 'p') {
                time += duration;
            } else if (elements[tokenId].type === 'v') {
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
                    time: time.toFixed(2),
                    sound,
                    vowelNotes,
                    index
                });

                ++index;

                time += duration;
            }
        });
    });
    
    return { music, time};
};

export { makeLetterGramma };
