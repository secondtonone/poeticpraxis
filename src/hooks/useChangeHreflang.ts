import { useEffect } from 'preact/hooks';
import changeHreflang from '@utils/changeHreflang';

const useChangeHreflang = (page?: string): void => {
    useEffect(() => {
        changeHreflang(page);
    }, []);
};

export default useChangeHreflang;
