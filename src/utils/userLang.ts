export default function userLang(): string {
    return (
        window.navigator.language || window.navigator['userLanguage'] || 'ru'
    );
}
