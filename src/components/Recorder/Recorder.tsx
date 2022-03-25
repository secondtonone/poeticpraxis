import { FunctionComponent } from 'preact';
import { useState, useEffect, useCallback } from 'preact/hooks';

import Langs from '@typings/Langs';
import isSupportRecognition from '@utils/isSupportRecognition';
import Recognition from '@modules/recognition';
import { translations } from './translations';

import Button, { ButtonProps } from '@components/Button';
import MicIcon from '@icons/Mic';

let recognition: InstanceType<typeof Recognition>;

interface RecorderProps extends ButtonProps {
    lang: Langs, 
    text: string, 
    transmitState: (props: { text: string }) => void, 
    showMessage: (text: string) => void
}

const Recorder: FunctionComponent<RecorderProps> = ({ lang = 'ru', text, transmitState, showMessage, ...props }) => {
  const [isRecording, setRecording] = useState(false);

  const onTranslate = useCallback(
    (transcription: string) => {
      const newText = `${text}\n${transcription}`;

      transmitState({
        text: newText,
      });
    },
    [text, transmitState]
  );

  const onError = useCallback(
    (message: string, isRecording: boolean) => {
      showMessage(message);
      setRecording(isRecording);
    },
    [showMessage, setRecording]
  );

  useEffect(() => {
    if (isSupportRecognition()) {
      recognition = new Recognition();
    }
  }, []);

  useEffect(() => {
    return () => recognition && isRecording && recognition.stop();
  }, [isRecording]);

  useEffect(() => {
    if (recognition) { 
      recognition.setOnResultHandler(onTranslate);
      recognition.setOnMessageHandler(onError);
    }
  }, [onTranslate]);

  const toggle = () => {
    recognition.toggle();
  };

  return isSupportRecognition() ? (
    <Button
      _flat
      _transparent
      _accent={isRecording}
      onClick={toggle}
      {...props}
    >
      <MicIcon _small padding="0 8px 0 0" />
      {' '}
      {isRecording ? translations[lang].OFF : translations[lang].ON}
    </Button>
  ) : null;
};

export default Recorder;
