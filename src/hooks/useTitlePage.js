import { useState, useEffect } from 'preact/hooks';
import changePageTitle from '@utils/changePageTitle';

const useTitlePage = (title) => {
    useEffect(() => {
        changePageTitle(title);
    }, []);

    useEffect(() => {
        changePageTitle(title);
    }, [title]);
};

export default useTitlePage;