import { textAnalyzer } from '@modules/workfield';

self.addEventListener('message', (e) => {
    const { text, stringsDictionary, wordsDictionary } = e.data;
    const analyzedText = textAnalyzer(text, stringsDictionary, wordsDictionary);
    self.postMessage(analyzedText);
});
