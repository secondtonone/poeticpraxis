import { useState } from 'preact/hooks';

const useMessage = (ms = 2000) => {
  const [textMessage, setTextMessage] = useState<string>('');
  const showMessage = (textMessage: string) => {
    setTextMessage(textMessage);

    setTimeout(() => {
      setTextMessage('');
    }, ms);
  };

  return [textMessage, showMessage] as const;
};

export default useMessage;
