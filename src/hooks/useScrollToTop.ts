import { useLayoutEffect } from 'preact/hooks';

const useScrollToTop = () => {
    useLayoutEffect(() => {
        requestAnimationFrame(() => window.scrollTo(0, 0));
    }, [])
};

export default useScrollToTop;
