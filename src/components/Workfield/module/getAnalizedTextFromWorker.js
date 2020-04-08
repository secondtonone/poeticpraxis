export default function getAnalizedTextFromWorker({ worker, text, stringsDictionary, wordsDictionary }) {
    return new Promise((resolve, reject) => {
        worker.postMessage({
            text,
            stringsDictionary,
            wordsDictionary,
        });

        worker.onmessage = (e) => {
            let analizedText = e.data;
            resolve(analizedText);
        };

        worker.onerror = (e) => {
            reject(e);
        };
    });
}
