import { useState, useEffect } from 'preact/hooks';

const useSessionStorage = (key) => {
    const [valueSessionStorage, setValueSessionStorage] = useState(
        sessionStorage.getItem(key) || ''
    ); 

    useEffect(() => {
        sessionStorage.setItem(key, valueSessionStorage);
    }, [valueSessionStorage]);

    return [valueSessionStorage, setValueSessionStorage];
};

export default useSessionStorage;
