import { FunctionalComponent } from 'preact';
import { useEffect, useReducer, useMemo, useCallback } from 'preact/hooks';
import { rhythmicModel, imagesEngineModel, layoutModel } from '@store/models';
import { Slices } from '@typings/State';
import {
    imagesEngineReducer,
    rhythmicReducer,
    layoutReducer,
} from '@store/reducers';
import { ActionTypes } from '@store/actions';

import DispatchContext from '@contexts/dispatchContext';
import StateContext from '@contexts/stateContext';

const LOCAL_STORAGE_NAME = '___PoeticPraxisApp___';

const STORAGES = {
    IMAGES_ENGINE: 'ImagesEngine',
    RHYTHMIC: 'Rhythmic',
    LAYOUT: 'Layout'
} as const;

const persistedFromLocal = (slice: Slices) => <T,>(initial: T) =>
typeof localStorage !== 'undefined' && localStorage?.getItem(LOCAL_STORAGE_NAME) ? (JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME) as string))[slice] as T : initial;

const AppContextContainer: FunctionalComponent = ({ children }) => {
    const [ImagesEngine, dispatchImagesEngine] = useReducer(
        imagesEngineReducer,
        imagesEngineModel,
        persistedFromLocal(STORAGES.IMAGES_ENGINE)
    );
    const [Rhythmic, dispatchRhythmic] = useReducer(
        rhythmicReducer,
        rhythmicModel,
        persistedFromLocal(STORAGES.RHYTHMIC)
    );
    const [Layout, dispatchLayout] = useReducer(
        layoutReducer,
        layoutModel,
        persistedFromLocal(STORAGES.LAYOUT)
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
        if (typeof window !== 'undefined') window.localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(combinedState));
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
