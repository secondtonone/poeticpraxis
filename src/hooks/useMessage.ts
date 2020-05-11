import { useState } from 'preact/hooks';

const useMessage = (ms: number = 2000) => {
    const [textMessage, useTextMessage] = useState<string | null>(null);
    const showMessage = (textMessage: string) => {
        useTextMessage(textMessage);

        setTimeout(() => {
            useTextMessage(null);
        }, ms);
    };

    return [textMessage, showMessage];
};

export default useMessage;
