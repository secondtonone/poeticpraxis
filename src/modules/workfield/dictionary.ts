import type { AccentTypes } from './accents';

export type DictionaryAccents = {
  accents: Array<{
    type: AccentTypes;
  }>;
};

export interface IDictionary {
  [key: string]: DictionaryAccents;
}
