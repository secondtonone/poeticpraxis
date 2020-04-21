import { useEffect } from 'preact/hooks';
import changeHreflang from '@utils/changeHreflang';

const useChangeHreflang = (page) => {
    useEffect(() => {
        changeHreflang(page);
    }, []);
};

export default useChangeHreflang;
