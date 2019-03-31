export let recorder = null;

let chunks = [];

export const setUpRecorder = (Instrument, onStart, onStop) => {
    try {
        const actx = Instrument.context;

        const dest = actx.createMediaStreamDestination();
        recorder = new MediaRecorder(dest.stream);

        recorder.ondataavailable = (e) => chunks.push(e.data);
        recorder.onstop = () => {
            let blob = new Blob(chunks, {
                type: 'audio/wav'
            });

            if (onStop) {
                onStop(URL.createObjectURL(blob));
            }
        };

        recorder.onstart = () => {
            if (onStart) {
                onStart();
            }
        };

        Instrument.connect(dest);
    } catch (e) {}
};
