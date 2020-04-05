import { useEffect } from 'preact/hooks';

const useScrollToTop = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
};

export default useScrollToTop;
