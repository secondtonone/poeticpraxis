import { useContext, useMemo } from 'preact/hooks';
import { setWordsDictionary, setRhythmicState, RhythmicActions } from '@store/actions/rhythmicActions';
import DispatchContext from '@contexts/dispatchContext';

const useRhythmicActions = () => {
    const dispatch = useContext(DispatchContext);

    const actionMaker = <T extends RhythmicActions>(action: T) => (payload: Parameters<RhythmicActions>[0]) => dispatch(action(payload)); 

    const actions = useMemo(() => ({
        setWordsDictionary: actionMaker(setWordsDictionary),
        setRhythmicState: actionMaker(setRhythmicState)
    }), [dispatch]);

    return actions;
}; 

export default useRhythmicActions;
