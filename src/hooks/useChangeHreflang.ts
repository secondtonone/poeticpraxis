import { useLayoutEffect } from 'preact/hooks';
import changeHreflang from '@utils/changeHreflang';

const useChangeHreflang = (page?: string): void => {
    useLayoutEffect(() => {
        changeHreflang(page);
    }, []);
};

export default useChangeHreflang;
