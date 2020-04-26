export interface IImagesEngineModel {
    currentEngineState: {
        result: [string, string][],
        text: string,
        pinned: string[],
        wordsNumber: number,
        currentView: 'material' | 'words'
    }
}

const imagesEngineModel: IImagesEngineModel = {
    currentEngineState: {
        result: [],
        text: '',
        pinned: [],
        wordsNumber: 2,
        currentView: 'material',
    },
};

export default imagesEngineModel;
