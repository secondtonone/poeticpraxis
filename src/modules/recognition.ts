import type { SpeechRecognition, SpeechEvent } from '@typings/SpeechRecognition';

export default class Recognition {
  recognition: InstanceType<SpeechRecognition>;
  isRecording: boolean;
  onMessage: (message: string, isRecording: boolean) => void;

  constructor(onResult?: (result: string) => void, onMessage?: (message: string, isRecording?: boolean) => void ) {
    const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;

    this.recognition = new SpeechRecognition();

    this.recognition.continuous = true;
    this.recognition.interimResults = true;

    this.isRecording = false;

    this.setOnResultHandler(onResult);
    this.setOnMessageHandler(onMessage);

    this.recognition.onspeechend = this.onSpeechEnd;
  }

  setOnResultHandler = (onResult?: (result: string) => void) => {
    if (typeof onResult === 'function') {
      this.recognition.onresult = this.onResult(onResult);
    }
  };

  setOnMessageHandler = (onMessage?: (message: string, isRecording: boolean) => void) => {
    if (typeof onMessage === 'function') {
      this.onMessage = onMessage;
    }
  };

  private stateHandler = (message: string, isRecording: boolean) => {
    if (typeof this.onMessage === 'function') {
      this.onMessage(message, isRecording);
    } else {
      console.warn(message);
    }
  };

  private onResult = (onResult: (result: string) => void) => (event: SpeechEvent) => {
    let finalTranscript = '';

    for (let i = event.resultIndex; i < event.results.length; i += 1) {
      const transcriptionPiece = event.results[i][0].transcript;
      // check for a finalized transcription in the cloud
      if (event.results[i].isFinal) {
        finalTranscript += transcriptionPiece;
      }
    }

    if (finalTranscript) {
      onResult(finalTranscript);
    }
  };

  /* private onError = () => {
        this.isRecording = false;

        return (event: SpeechEvent) => {
            if (event.error === 'no-speech') {
                this.stateHandler('Ошибка записи', this.isRecording);
            } else {
                this.stateHandler('Запись не возможна', this.isRecording);
            }
        };
    }; */

  private onSpeechEnd = () => {
    setTimeout(() => {
      this.stop();
    }, 1000);
  };

  start = () => {
    this.isRecording = true;
    this.recognition.start();
    this.stateHandler('Запись включена', this.isRecording);
  };

  stop = () => {
    this.isRecording = false;
    this.recognition.stop();
    this.stateHandler('Запись окончена', this.isRecording);
  };

  toggle = () => {
    if (this.isRecording) {
      this.stop();
    } else {
      this.start();
    }
  };
}
