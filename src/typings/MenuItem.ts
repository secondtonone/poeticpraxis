import { Views } from '@typings/ImagesEngineModel';

export default interface MenuItem {
    content: React.ReactNode
    disabled: boolean
    value: Views
    title: string
}
