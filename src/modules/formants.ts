import type { IVLetterElement, ICLetterElement } from '@modules/workfield/structure';
import isConsonantAlwaysSolid from '@modules/workfield/isConsonantAlwaysSolid';

type FormantAccented = {
    main: number[];
    beforeSolid?: number[];
    afterSoft?: number[];
    beforeSoft?: number[];
    circledBySoft?: number[];
    beforeVowel?: number[];
    afterAlwaysSolid?: number[];
};

type FormantReduced = {
    main: number[];
    afterAlwaysSolid?: number[];
    afterSoft?: number[];
    beforeSolid?: number[];
};

export interface IFormat {
    tone: number
    reduced: FormantReduced
    accented: FormantAccented
}

type FormantList = keyof FormantAccented | keyof FormantReduced;

type FormantListExtended = FormantList | '';

type LetterElementExtended = ICLetterElement | IVLetterElement | null;

export interface IFormants {
    [key: string]: IFormat;
}

const formants: IFormants = {
  а: {
    tone: 116,
    reduced: {
      main: [660, 1370, 2430],
      afterSoft: [310, 1825, 2335],
    },
    accented: {
      main: [755, 1360, 2500],
      beforeSoft: [750, 1390, 2540],
      afterSoft: [780, 1490, 2400],
      circledBySoft: [790, 1740, 2370],
    },
  },
  е: {
    tone: 119,
    reduced: {
      main: [415, 1895, 2535],
      afterAlwaysSolid: [315, 1500, 2350],
    },
    accented: {
      main: [385, 2025, 2700],
      beforeSoft: [400, 2025, 2590],
      afterAlwaysSolid: [460, 1590, 2600],
      circledBySoft: [335, 2090, 2685],
    },
  },
  у: {
    tone: 115,
    reduced: {
      main: [300, 925, 3600],
    },
    accented: {
      main: [305, 975, 2715],
      beforeSoft: [325, 750, 4025],
      circledBySoft: [300, 750, 2200],
    },
  },
  и: {
    tone: 100,
    reduced: {
      main: [355, 1985, 2625],
      afterAlwaysSolid: [360, 1485, 2440],
    },
    accented: {
      main: [290, 2190, 2865],
      afterAlwaysSolid: [300, 2075, 2550],
    },
  },
  о: {
    tone: 122,
    reduced: {
      main: [375, 840, 2650],
    },
    accented: {
      main: [480, 825, 2495],
      beforeSoft: [480, 1140, 2090],
      afterSoft: [390, 1200, 1940],
      circledBySoft: [410, 1125, 2190],
    },
  },
  ы: {
    tone: 130,
    reduced: { main: [360, 1485, 2440] },
    accented: { main: [285, 1655, 2465] },
  },
  э: {
    tone: 119,
    reduced: {
      main: [415, 1895, 2535],
    },
    accented: {
      main: [465, 1750, 2450],
      beforeSoft: [400, 2025, 2590],
    },
  },
  ё: {
    tone: 120,
    reduced: {
      main: [375, 840, 2650],
    },
    accented: {
      main: [390, 1200, 1940],
      beforeSoft: [410, 1125, 2190],
    },
  },
  ю: {
    tone: 130,
    reduced: { main: [300, 925, 3600] },
    accented: { main: [300, 800, 1975] },
  },
  я: {
    tone: 100,
    reduced: {
      main: [460, 1450, 2775],
      beforeSolid: [310, 1825, 2335],
    },
    accented: {
      main: [780, 1490, 2400],
      circledBySoft: [790, 1740, 2370],
      beforeVowel: [790, 1740, 2370],
    },
  },
  a: {
    tone: 80,
    reduced: { main: [660] },
    accented: { main: [755, 1360, 2500] },
  },
  u: {
    tone: 80,
    reduced: { main: [300] },
    accented: { main: [305, 975, 2715] },
  },
  i: {
    tone: 80,
    reduced: { main: [690] },
    accented: { main: [780, 1490, 2400] },
  },
  y: {
    tone: 80,
    reduced: { main: [660] },
    accented: { main: [755, 1360, 2500] },
  },
  e: {
    tone: 80,
    reduced: { main: [355] },
    accented: { main: [290, 2190, 2865] },
  },
  o: {
    tone: 80,
    reduced: { main: [375] },
    accented: { main: [480, 825, 2495] },
  },
};

const beforeVowel = (next: LetterElementExtended): FormantListExtended =>
  next && next['type'] === 'v' ? 'beforeVowel' : '';
const beforeSolid = (next: LetterElementExtended): FormantListExtended =>
  (next as ICLetterElement)['isSolid'] === true ? 'beforeSolid' : '';
const afterAlwaysSolid = (prev: LetterElementExtended): FormantListExtended =>
  prev && (prev as ICLetterElement)['isSolid'] === true && isConsonantAlwaysSolid(prev['char'])
    ? 'afterAlwaysSolid'
    : '';
const beforeSoft = (next: LetterElementExtended): FormantListExtended =>
  (next as ICLetterElement)['isSolid'] === false ? 'beforeSoft' : '';
const afterSoft = (prev: LetterElementExtended): FormantListExtended =>
  (prev as ICLetterElement)['isSolid'] === false ? 'afterSoft' : '';
const circledBySoft = (
  prev: LetterElementExtended,
  next: LetterElementExtended
): FormantListExtended => (afterSoft(prev) && beforeSoft(next) ? 'circledBySoft' : '');

const forPrev = (prev: LetterElementExtended): FormantListExtended =>
  prev ? afterSoft(prev) || afterAlwaysSolid(prev) : '';
const forNext = (next: LetterElementExtended): FormantListExtended =>
  next ? beforeSoft(next) || beforeSolid(next) || beforeVowel(next) : '';
const forBoth = (
  prev: LetterElementExtended,
  next: LetterElementExtended
): FormantListExtended => (next && prev ? circledBySoft(prev, next) : '');

const getFormant = (
  prev: LetterElementExtended,
  next: LetterElementExtended
): FormantList => forBoth(prev, next) || forNext(next) || forPrev(prev) || 'main';

const getGroup = (
  char: string,
  isAccented: boolean
): FormantAccented | FormantReduced =>
  isAccented ? formants[char].accented : formants[char].reduced;

const getFinalFormant = (
  group: FormantReduced | FormantAccented,
  predictedFormant: FormantList
): FormantList =>
  Object.keys(group).includes(predictedFormant) ? predictedFormant : 'main';

const calculateFormant = ({
  group,
  prev,
  next,
}: {
    group: FormantReduced | FormantAccented;
    prev: LetterElementExtended;
    next: LetterElementExtended;
}): FormantList =>
  getFinalFormant(group, getFormant(prev, next));

export { getFormant, getGroup, getFinalFormant, calculateFormant };

export default formants;
