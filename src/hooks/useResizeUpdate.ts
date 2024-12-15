import { useState } from 'preact/hooks';
import useEffectOnce from './useEffectOnce';

const useResizeUpdate = (initHeight = 800) => {
  const [innerWidth, setInnerWidth] = useState<number>(0);
  const [innerHeight, setInnerHeight] = useState<number>(initHeight);

  useEffectOnce(() => {
    const updateDimensions = () => {
      requestAnimationFrame(() => {
        setInnerHeight(window.innerHeight);
        setInnerWidth(window.innerWidth);
      });
    };

    updateDimensions();

    window.addEventListener('resize', updateDimensions);

    return () => window.removeEventListener('resize', updateDimensions);
  });

  return { innerWidth, setInnerWidth, innerHeight, setInnerHeight };
};

export default useResizeUpdate;
