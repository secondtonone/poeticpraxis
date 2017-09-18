import { combineReducers } from 'redux'
import ImagesEngine from '../routes/ImagesEngine/imagesEngineReducer';
import Rhythmic from '../routes/Rhythmic/rhythmicReducer';

const app = combineReducers({
  ImagesEngine,
  Rhythmic
})

export default app;