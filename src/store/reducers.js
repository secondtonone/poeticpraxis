import { combineReducers } from 'redux';
import ImagesEngine from '../routes/ImagesEngine/imagesEngineReducer';
import Rhythmic from '../routes/Rhythmic/rhythmicReducer';
import Layout from '../components/Layout/layoutReducer';

const app = combineReducers({
    ImagesEngine,
    Rhythmic,
    Layout
});

export default app;
