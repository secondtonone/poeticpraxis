import { useEffect } from 'preact/hooks';

// eslint-disable-next-line react-hooks/exhaustive-deps
const useEffectOnce = <T extends () => void>(effect: T) => useEffect(effect, []);

export default useEffectOnce;
