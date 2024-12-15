import type { ToneLib, Recorder } from '@typings/ToneTypes';

export const setUpRecorder = ({
  tone,
  onStart,
  onStop,
  connect,
}: {
    tone: ToneLib;
    onStart: () => void;
    onStop: (url: string) => void;
    connect: (dest: Recorder) => void;
}) => {
  const recorder = new tone.Recorder();
  connect(recorder);

  return {
    onStart: () => {
      recorder.start();
      if (typeof onStart === 'function') onStart();
    },
    onStop: async () => {
      const recording = await recorder.stop();
      const url = URL.createObjectURL(recording);

      if (typeof onStop === 'function') onStop(url);
    }
  };
};

export class MediaRecorder {
  recorder: Recorder;
  onStopHandler: (url: string) => void;

  connect (Tone: ToneLib, adapter: (dest: Recorder) => void) {
    this.recorder = new Tone.Recorder();
    adapter(this.recorder);
  }

  onStart(onStopHandler: (url: string) => void, timeout: number) {
    this.recorder.start();

    setTimeout(() => {
      this._onStop(onStopHandler);
    }, timeout);
  }

  async _onStop(onStopHandler: (url: string) => void) {
    const recording = await this.recorder.stop();
    const url = URL.createObjectURL(recording);

    if (typeof onStopHandler === 'function') onStopHandler(url);
  }
}
