import { useEffect } from 'preact/hooks';
import changePageTitle from '@utils/changePageTitle';

const useTitlePage = (title: string) => {
    useEffect(() => {
        changePageTitle(title);
    }, []);

    useEffect(() => {
        changePageTitle(title);
    }, [title]);
};

export default useTitlePage;
