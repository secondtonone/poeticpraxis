import { useContext, useMemo } from 'preact/hooks';
import { changeTheme, changeLang, LayoutActions } from '@store/actions/layoutActions';
import DispatchContext from '@contexts/dispatchContext';

const useLayoutActions = () => {
    const dispatch = useContext(DispatchContext);

    const actionMaker = <T extends LayoutActions>(action: T) => (payload: Parameters<LayoutActions>[0]) => dispatch(action(payload)); 

    const actions = useMemo(() => ({
        changeTheme: actionMaker(changeTheme),
        changeLang: actionMaker(changeLang)
    }), [dispatch]);

    return actions;
}; 

export default useLayoutActions;
