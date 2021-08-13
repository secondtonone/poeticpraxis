import { h, FunctionalComponent } from 'preact';
import { useEffect, useReducer, useMemo, useCallback } from 'preact/hooks';
import { rhythmicModel, imagesEngineModel, layoutModel } from '@store/models';
import State, { Slices } from '@typings/State';
import {
    imagesEngineReducer,
    rhythmicReducer,
    layoutReducer,
} from '@store/reducers';
import { ActionTypes } from '@store/actions';

import DispatchContext from '@contexts/dispatchContext';
import StateContext from '@contexts/stateContext';

const storageName = '___PoeticPraxisAppTest___';

const persistedFromLocal = (slice: Slices) => <T,>(initial: T) =>
    typeof localStorage !== 'undefined' ? (JSON.parse(localStorage.getItem(storageName)))[slice] as T : initial;

const AppContextContainer: FunctionalComponent = ({ children }) => {
    const [ImagesEngine, dispatchImagesEngine] = useReducer(
        imagesEngineReducer,
        imagesEngineModel,
        persistedFromLocal('ImagesEngine')
    );
    const [Rhythmic, dispatchRhythmic] = useReducer(
        rhythmicReducer,
        rhythmicModel,
        persistedFromLocal('Rhythmic')
    );
    const [Layout, dispatchLayout] = useReducer(
        layoutReducer,
        layoutModel,
        persistedFromLocal('Layout')
    );

    const combinedDispatch = useCallback(
        (action: ActionTypes) =>
            [dispatchImagesEngine, dispatchRhythmic, dispatchLayout].forEach(
                (dispatch) => dispatch(action)
            ),
        [dispatchImagesEngine, dispatchRhythmic, dispatchLayout]
    );

    const combinedState = useMemo(
        () => ({ ImagesEngine, Rhythmic, Layout }),
        [ImagesEngine, Rhythmic, Layout]
    );

    useEffect(() => {
        if (typeof window !== 'undefined') window.localStorage.setItem(storageName, JSON.stringify(combinedState));
    }, [combinedState]);

    return (
        <DispatchContext.Provider value={combinedDispatch}>
            <StateContext.Provider value={combinedState}>
                {children}
            </StateContext.Provider>
        </DispatchContext.Provider>
    );
};

export default AppContextContainer;
