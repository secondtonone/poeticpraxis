import { useState } from 'preact/hooks';

const useMessage = (ms = 2000) => {
    const [textMessage, useTextMessage] = useState(null);
    const showMessage = (textMessage) => {
        useTextMessage(textMessage);

        setTimeout(() => {
            useTextMessage(null);
        }, ms);
    };

    return [textMessage, showMessage];
};

export default useMessage;
