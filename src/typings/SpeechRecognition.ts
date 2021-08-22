export interface SpeechEvent {
    resultIndex: number
    results: Array<{
        0: {
            transcript: string
            isFinal: boolean
        },
        isFinal: boolean,
    }>,
    error: string | null
}

export type SpeechRecognition = new () => {
    continuous: boolean;
    interimResults: boolean;
    onspeechend: () => void;
    start: () => void;
    stop: () => void;
    onresult: (event: SpeechEvent) => void;
};

declare global {
    interface Window {
        SpeechRecognition: SpeechRecognition;
        webkitSpeechRecognition: SpeechRecognition;
    }
}
