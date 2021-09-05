import { textAnalyzer } from '@modules/workfield';
import WorkerData from '@typings/WorkerData';

const ctx: Worker = self as any;

ctx.addEventListener('message', (e: MessageEvent<WorkerData>) => {
    const { text, stringsDictionary, wordsDictionary } = e.data;
    const analyzedText = textAnalyzer(text, stringsDictionary, wordsDictionary);
    self.postMessage(analyzedText);
});

export default ctx;
