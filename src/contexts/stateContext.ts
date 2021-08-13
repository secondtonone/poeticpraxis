import { createContext } from 'preact';
import State from '@typings/State';

const StateContext = createContext<State>(null);

export default StateContext;
