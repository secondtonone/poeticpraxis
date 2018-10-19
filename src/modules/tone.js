export let Tone = {};

export function getToneModule() {
    return import(/* webpackChunkName: "Tone" */ 'tone').then(
        (ToneModule) => (Tone = ToneModule)
    );
}
