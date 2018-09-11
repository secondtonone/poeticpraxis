export default class Recognition {
    constructor(onResult, onMessage) {
        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;

        this.recognition = new SpeechRecognition();

        this.recognition.continuous = true;
        this.recognition.interimResults = true;

        this.isRecording = false;

        this.onMessage = onMessage;

        if (onResult) {
            this.recognition.onresult = this.onResult(onResult);
        }

        this.recognition.onspeechend = this.onSpeechEnd;
    }

    stateHandler = (message, isRecording) => {
        if (this.onMessage) {
            this.onMessage(message, isRecording);
        } else {
            console.log(message);
        }
    };

    onResult = (onResult) => {
        return (event) => {
            let finalTranscript = '';

            for (let i = event.resultIndex; i < event.results.length; i += 1) {
                const transcriptionPiece = event.results[i][0].transcript;
                // check for a finalised transciption in the cloud
                if (event.results[i].isFinal) {
                    finalTranscript += transcriptionPiece;
                }
            }

            if (finalTranscript) {
                onResult(finalTranscript);
            }
        };
    };

    onError = (onError) => {
        this.isRecording = false;
        return (event) => {
            if (event.error == 'no-speech') {
                this.stateHandler('Ошибка записи', this.isRecording);
            } else {
                this.stateHandler('Запись не возможна', this.isRecording);
            }
        };
    };

    onSpeechEnd = () => {
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
