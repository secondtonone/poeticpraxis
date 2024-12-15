import type { IDictionary } from '@modules/workfield/dictionary';

export default interface WorkerData {
  text: string;
  stringsDictionary: IDictionary;
  wordsDictionary: IDictionary;
};
