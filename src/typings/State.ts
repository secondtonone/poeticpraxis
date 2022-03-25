import ImagesEngineModel from './ImagesEngineModel';
import RhythmicModel from './RhythmicModel';
import LayoutModel from './LayoutModel';

export default interface State {
  ImagesEngine: ImagesEngineModel
  Layout: LayoutModel
  Rhythmic: RhythmicModel
};

export type Slices = keyof State;
