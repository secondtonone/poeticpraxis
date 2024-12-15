import type ImagesEngineModel from './ImagesEngineModel';
import type RhythmicModel from './RhythmicModel';
import type LayoutModel from './LayoutModel';

export default interface State {
  ImagesEngine: ImagesEngineModel
  Layout: LayoutModel
  Rhythmic: RhythmicModel
};

export type Slices = keyof State;
