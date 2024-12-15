import { createContext } from 'preact';
import type State from '@typings/State';

// @ts-ignore
const StateContext = createContext<State>(null);

export default StateContext;
