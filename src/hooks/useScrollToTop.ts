import useEffectOnce from './useEffectOnce';

const useScrollToTop = () => {
  useEffectOnce(() => {
    requestAnimationFrame(() => window.scrollTo(0, 0));
  });
};

export default useScrollToTop;
