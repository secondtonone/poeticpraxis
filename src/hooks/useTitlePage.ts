import { useLayoutEffect } from 'preact/hooks';
import changePageTitle from '@utils/changePageTitle';

const useTitlePage = (title: string) => {
  useLayoutEffect(() => {
    changePageTitle(title);
  });

  useLayoutEffect(() => {
    changePageTitle(title);
  }, [title]);
};

export default useTitlePage;
