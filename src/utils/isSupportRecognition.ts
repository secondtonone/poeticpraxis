export default function isSupportRecognition():boolean {
    return !!(window.SpeechRecognition || window['webkitSpeechRecognition']);
}
