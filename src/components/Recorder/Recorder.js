import { h } from 'preact';
import { useState, useEffect, useCallback } from 'preact/compat';

import Recognition from '@modules/recognition';
import { translations } from './translations';

import Button from '@components/Button';
import MicIcon from '@icons/Mic';

let recognition = null;

export default function Recorder (props) {

    const { lang = 'ru', text, transmitState, showMessage} = props;
    
    const [ isRecording, setRecording ] = useState(false);
    const [ isSupporting, setSupporting ] = useState(true);

    const onTranslate = useCallback(
        (transcription) => {
            const newText = `${text}\n${transcription}`;

            transmitState({
                text: newText
            });
        },
        [text, transmitState]
    );

    const onError = useCallback(
        (message, isRecording) => {
            showMessage(message);
            setRecording(isRecording);
        },
        [showMessage, setRecording]
    );

    useEffect(() => {
        try {
            recognition = new Recognition();
        } catch (error) {
            setSupporting(false);
        }
    }, []);

    useEffect(() => {
        return () => recognition && isRecording && recognition.stop();
    }, [isRecording]);

    useEffect(() => {
        recognition.setOnResultHandler(onTranslate);
        recognition.setOnMessagetHandler(onError);
    }, [onTranslate]);


    const toggle = () => {
        recognition.toggle();
    };


    if (!isSupporting) {
        return null;
    }
    return (
        <Button _flat _transparent _accent={isRecording} onClick={toggle} {...props}>
            <MicIcon _small padding="0 8px 0 0" />{' '}
            {isRecording ? translations[lang].OFF : translations[lang].ON}
        </Button>
    );
}
