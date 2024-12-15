import { createContext } from 'preact';
import type { ActionTypes } from '@store/actions';

// @ts-ignore
const DispatchContext = createContext<(payload: ActionTypes) => void>(null);

export default DispatchContext;
