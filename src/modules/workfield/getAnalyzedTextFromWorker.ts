import { IDictionary } from './dictionary';
import { TextAnalyzerResult } from './textAnalyzer';

interface WorkerProps { 
    worker: Worker, 
    text: string, 
    stringsDictionary: IDictionary, 
    wordsDictionary: IDictionary 
}

export default function getAnalyzedTextFromWorker({ worker , text, stringsDictionary, wordsDictionary }: WorkerProps) {
  return new Promise<TextAnalyzerResult>((resolve, reject) => {
    worker.postMessage({
      text,
      stringsDictionary,
      wordsDictionary,
    });

    worker.onmessage = (e: MessageEvent<TextAnalyzerResult>) => {
      const analyzedText = e.data;
      resolve(analyzedText);
    };

    worker.onerror = (e) => {
      reject(e);
    };
  });
}
