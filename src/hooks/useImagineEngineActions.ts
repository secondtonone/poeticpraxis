import { useContext, useMemo } from 'preact/hooks';
import { setEngineState, sharingText, ImagesEngineActions } from '@store/actions/imagesEngineActions';
import DispatchContext from '@contexts/dispatchContext';

const useImagesEngineActions = () => {
  const dispatch = useContext(DispatchContext);

  const actionMaker = <T extends ImagesEngineActions>(action: T) => (payload: Parameters<ImagesEngineActions>[0]) => dispatch(action(payload)); 

  const actions = useMemo(() => ({
    setEngineState: actionMaker(setEngineState),
    sharingText: actionMaker(sharingText)
  }), [dispatch]);

  return actions;
}; 

export default useImagesEngineActions;
