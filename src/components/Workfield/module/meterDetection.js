import rhythmPresets from './rhythmPresets';
export default function meterDetection() {
    let map = [0, 0, 0, 0, 0, 0];
    let count = 0;

    return (stringMeter) => {
        map[stringMeter] = map[stringMeter] ? map[stringMeter] + 1 : 1;

        ++count;

        const mainMeter = map.indexOf(Math.max(...map));
        const inPercent = Math.floor(map[mainMeter] / (count / 100));
        const title = rhythmPresets[mainMeter].title;

        return { title, inPercent };
    };
}
