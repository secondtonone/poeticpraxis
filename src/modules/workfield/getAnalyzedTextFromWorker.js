export default function getAnalyzedTextFromWorker({ worker, text, stringsDictionary, wordsDictionary }) {
    return new Promise((resolve, reject) => {
        worker.postMessage({
            text,
            stringsDictionary,
            wordsDictionary,
        });

        worker.onmessage = (e) => {
            let analyzedText = e.data;
            resolve(analyzedText);
        };

        worker.onerror = (e) => {
            reject(e);
        };
    });
}
