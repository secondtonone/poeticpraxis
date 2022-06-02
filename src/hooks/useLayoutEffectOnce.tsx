import { useLayoutEffect } from 'preact/hooks';

// eslint-disable-next-line react-hooks/exhaustive-deps
const useLayoutEffectOnce = <T extends () => void>(effect: T) => useLayoutEffect(effect, []);

export default useLayoutEffectOnce;
