import { combineReducers } from 'redux';
import ImagesEngine from '@routes/ImagesEngine/imagesEngineReducer';
import Rhythmic from '@routes/Rhythmic/rhythmicReducer';
import Layout from '@containers/Layout/layoutReducer';

const reducers = combineReducers({
    ImagesEngine,
    Rhythmic,
    Layout
});

export default reducers;
