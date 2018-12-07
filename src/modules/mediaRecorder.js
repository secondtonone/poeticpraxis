export let recorder = null;

let chunks = [];

export const setUpRecorder = (Instrument, onStop) => {
    const actx = Instrument.context;

    const dest = actx.createMediaStreamDestination();
    recorder = new MediaRecorder(dest.stream);

    recorder.ondataavailable = (evt) => chunks.push(evt.data);
    recorder.onstop = (evt) => {
        let blob = new Blob(chunks, {
            type: 'audio/wav'
        });

        if (onStop) {
            onStop(URL.createObjectURL(blob));
        }
    };

    Instrument.connect(dest);
};
