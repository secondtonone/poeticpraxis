import { useContext, useMemo } from 'preact/hooks';
import { changeTheme, changeLang, type LayoutActions } from '@store/actions/layoutActions';
import DispatchContext from '@contexts/dispatchContext';

const useLayoutActions = () => {
  const dispatch = useContext(DispatchContext);

  const actions = useMemo(() => {
    const actionMaker = <T extends LayoutActions>(action: T) => (payload: Parameters<LayoutActions>[0]) => dispatch(action(payload)); 

    return {
      changeTheme: actionMaker(changeTheme),
      changeLang: actionMaker(changeLang)
    };
  }, [dispatch]);

  return actions;
}; 

export default useLayoutActions;
