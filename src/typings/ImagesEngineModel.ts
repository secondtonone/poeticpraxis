export type Views = 'material' | 'words';
export type Result = [first?: string, second?: string ][];

export default interface IImagesEngineModel {
    currentEngineState: {
        result: Result,
        text: string,
        pinned: string[],
        wordsNumber: number,
        currentView: Views
    }
}
