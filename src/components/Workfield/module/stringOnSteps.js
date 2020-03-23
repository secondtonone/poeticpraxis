export default function stringOnSteps(
    string = [],
    totalAccents = 0,
    elements = {}
) {
    const isAccented = (id) =>
        id ? elements[id].accent === 1 || elements[id].accent === 2 : false;

    const whichStep = (index, step = 2) => {
        if (string[index + step] && !isAccented(string[index + step])) {
            return whichStep(index, step + 1);
        }
        return step;
    };

    const elementCount = string.length;

    let steps = [];

    let step = [];

    let defaultStep = Math.floor(elementCount / totalAccents);

    for (let index = 0; index < elementCount; index++) {
        const element = string[index];

        if (isAccented(element)) {
            defaultStep = whichStep(index, defaultStep);
        }

        step.push(element);

        if (step.length >= defaultStep || index === elementCount - 1) {
            steps.push(step);
            step = [];
        }
    }

    return steps;
}
