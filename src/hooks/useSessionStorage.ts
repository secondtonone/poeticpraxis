import { useState, useEffect } from 'preact/hooks';

const useSessionStorage = (key: string) => {
  const [valueSessionStorage, setValueSessionStorage] = useState<string>(
    sessionStorage.getItem(key) || ''
  ); 

  useEffect(() => {
    sessionStorage.setItem(key, valueSessionStorage);
  }, [valueSessionStorage]);

  return {valueSessionStorage, setValueSessionStorage};
};

export default useSessionStorage;
