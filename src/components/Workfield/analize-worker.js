import { textAnalizator } from './module';

self.addEventListener('message', (e) => {
    const { text, stringsDictionary, wordsDictionary } = e.data;
    const analizedText = textAnalizator(
        text,
        stringsDictionary,
        wordsDictionary
    );
    self.postMessage(analizedText);
});
