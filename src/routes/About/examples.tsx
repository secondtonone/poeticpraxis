import type { IDictionary } from "@modules/workfield/dictionary";

const examples = {
  ru: {
    text: `Духовной жаждою томим,\nВ пустыне мрачной я влачился,\nИ шестикрылый серафим\nНа перепутье мне явился...`,
    stringsDictionary: JSON.parse(
      '{"духовной жаждою томим,":{"accents":[{"type":0},{"type":0},{"type":0},{"type":1},{"type":0},{"type":0},{"type":0},{"type":0},{},{"type":0},{"type":1},{"type":0},{"type":0},{"type":0},{"type":2},{},{"type":0},{"type":0},{"type":0},{"type":1},{"type":0},{}]},"в пустыне мрачной я влачился,":{"accents":[{"type":0},{},{"type":0},{"type":0},{"type":0},{"type":0},{"type":1},{"type":0},{"type":0},{},{"type":0},{"type":0},{"type":0},{"type":0},{"type":0},{"type":0},{"type":0},{},{"type":0},{},{"type":0},{"type":0},{"type":0},{"type":0},{"type":0},{"type":0},{"type":0},{"type":0},{}]},"и шестикрылый серафим":{"accents":[{"type":0},{},{"type":0},{"type":0},{"type":0},{"type":0},{"type":0},{"type":0},{"type":0},{"type":0},{"type":0},{"type":0},{"type":0},{},{"type":0},{"type":0},{"type":0},{"type":0},{"type":0},{"type":0},{"type":0}]},"на перепутье мне явился...":{"accents":[{"type":0},{"type":0},{},{"type":0},{"type":0},{"type":0},{"type":0},{"type":0},{"type":0},{"type":0},{"type":0},{"type":0},{},{"type":0},{"type":0},{"type":0},{},{"type":0},{"type":0},{"type":0},{"type":0},{"type":0},{"type":0},{},{},{}]}}'
    ) as IDictionary
  },
  en: {
    text: `Two households, both alike in dignity,\nIn fair Verona, where we lay our scene,\nFrom ancient grudge break to new mutiny,\nWhere civil blood makes civil hands unclean.`,
    stringsDictionary: JSON.parse(
      '{"two households, both alike in dignity,":{"accents":[{"type":0},{"type":0},{"type":0},{},{"type":0},{"type":1},{"type":3},{"type":0},{"type":3},{"type":0},{"type":0},{"type":0},{"type":0},{"type":0},{},{},{"type":0},{"type":1},{"type":0},{"type":0},{},{"type":0},{"type":0},{"type":1},{"type":0},{"type":3},{},{"type":0},{"type":0},{},{"type":0},{"type":1},{"type":0},{"type":0},{"type":0},{"type":0},{"type":2},{}]},"in fair verona, where we lay our scene,":{"accents":[{"type":0},{"type":0},{},{"type":0},{"type":1},{"type":0},{"type":0},{},{"type":0},{"type":0},{"type":0},{"type":1},{"type":0},{"type":0},{},{},{"type":0},{"type":0},{"type":0},{"type":0},{"type":0},{},{"type":0},{"type":0},{},{"type":0},{"type":0},{"type":0},{},{"type":0},{"type":0},{"type":0},{},{"type":0},{"type":0},{"type":0},{"type":0},{"type":0},{}]},"from ancient grudge break to new mutiny,":{"accents":[{"type":0},{"type":0},{"type":0},{"type":0},{},{"type":0},{"type":0},{"type":0},{"type":0},{"type":0},{"type":0},{"type":0},{},{"type":0},{"type":0},{"type":0},{"type":0},{"type":0},{"type":0},{},{"type":0},{"type":0},{"type":0},{"type":0},{"type":0},{},{"type":0},{"type":0},{},{"type":0},{"type":0},{"type":0},{},{"type":0},{"type":0},{"type":0},{"type":0},{"type":0},{"type":0},{}]},"where civil blood makes civil hands unclean.":{"accents":[{"type":0},{"type":0},{"type":0},{"type":0},{"type":0},{},{"type":0},{"type":0},{"type":0},{"type":0},{"type":0},{},{"type":0},{"type":0},{"type":0},{"type":0},{"type":0},{},{"type":0},{"type":0},{"type":0},{"type":0},{"type":0},{},{"type":0},{"type":0},{"type":0},{"type":0},{"type":0},{},{"type":0},{"type":0},{"type":0},{"type":0},{"type":0},{},{"type":0},{"type":0},{"type":0},{"type":0},{"type":0},{"type":0},{"type":0},{}]}}'
    ) as IDictionary
  }
} as const;

export default examples;
