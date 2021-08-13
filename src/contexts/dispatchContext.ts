import { createContext } from 'preact';
import { ActionTypes } from '@store/actions';

const DispatchContext = createContext<(payload: ActionTypes) => void>(null);

export default DispatchContext;
