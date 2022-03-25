export let recorder: InstanceType<typeof MediaRecorder> | null = null;

const chunks: Blob[] = [];

export const setUpRecorder = ({
  context,
  onStart,
  onStop,
  connect,
}: {
    context: AudioContext;
    onStart: () => void;
    onStop: (url: string) => void;
    connect: (dest: MediaStreamAudioDestinationNode) => void;
}) => {
  try {
    const actx: AudioContext = context;

    const dest = actx.createMediaStreamDestination();
    recorder = new MediaRecorder(dest.stream);

    recorder.ondataavailable = (e) => chunks.push(e.data);
    recorder.onstop = () => {
      const blob = new Blob(chunks, {
        type: 'audio/wav',
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

    connect(dest);
  } catch (e) {}
};
