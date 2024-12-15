import { textAnalyzer } from '@modules/workfield';
import type WorkerData from '@typings/WorkerData';

self.onmessage = (e: MessageEvent<WorkerData>) => {
  const { text, stringsDictionary, wordsDictionary } = e.data;
  const analyzedText = textAnalyzer(text, stringsDictionary, wordsDictionary);
  self.postMessage(analyzedText);
};

export {};
