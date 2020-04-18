import { useEffect } from 'preact/hooks';

const useScrollToTop = () => {
    useEffect(() => {
        requestAnimationFrame(() => window.scrollTo(0, 0));
    }, [])
};

export default useScrollToTop;
