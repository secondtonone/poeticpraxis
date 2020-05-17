export interface IFormat {
    tone: number;
    reduced: {
        main: number[];
        afterAlwaysSolid?: number[];
        afterSoft?: number[];
        beforeSolid?: number[];
    };
    accented?: {
        main: number[];
        beforeSolid?: number[];
        afterSoft?: number[];
        beforeSoft?: number[];
        circledBySoft?: number[];
        beforeVowel?: number[];
        afterAlwaysSolid?: number[];
        last?: number[];
    };
}

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

export default formants;