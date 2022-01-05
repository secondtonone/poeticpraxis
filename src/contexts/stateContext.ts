import { createContext } from 'preact';
import State from '@typings/State';

// @ts-ignore
const StateContext = createContext<State>(null);

export default StateContext;
