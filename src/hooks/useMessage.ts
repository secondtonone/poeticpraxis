import { useState } from 'preact/hooks';

const useMessage = (ms = 2000) => {
  const [textMessage, useTextMessage] = useState<string>('');
  const showMessage = (textMessage: string) => {
    useTextMessage(textMessage);

    setTimeout(() => {
      useTextMessage('');
    }, ms);
  };

  return [textMessage, showMessage] as const;
};

export default useMessage;
