import changeHreflang from '@utils/changeHreflang';
import useLayoutEffectOnce from './useLayoutEffectOnce';

const useChangeHreflang = (page?: string): void => {
  useLayoutEffectOnce(() => {
    changeHreflang(page);
  });
};

export default useChangeHreflang;
