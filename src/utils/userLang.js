export default function userLang() {
    return window.navigator.language || window.navigator.userLanguage || 'ru';
}
