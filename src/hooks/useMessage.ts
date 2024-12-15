import { useCallback, useState } from 'preact/hooks';

const useMessage = (ms = 2000) => {
  const [textMessage, setTextMessage] = useState<string>('');
  const showMessage = useCallback((textMessage: string) => {
    setTextMessage(textMessage);

    setTimeout(() => {
      setTextMessage('');
    }, ms);
  }, [ms]);

  return [textMessage, showMessage] as const;
};

export default useMessage;
