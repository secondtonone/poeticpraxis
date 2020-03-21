export default function isSupportRecognition() {
    return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
}
