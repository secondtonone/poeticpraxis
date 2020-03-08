import { h } from 'preact';

import useSessionStorage from '../../hooks/useSessionStorage';

import Info from '../../components/Info';

import { Container } from '../../styles/components';

import { maxMatchMedia, isSupportRecognition } from '../../utils';

const helpState = () => {
    const [valueSessionStorage, setValueSessionStorage] = useSessionStorage(
        'isHideImagesEngineHelp'
    );

    return [valueSessionStorage, () => setValueSessionStorage(true)];
};

export default function Help({ lang = 'ru' }) {
    const recognitionSupport = isSupportRecognition();
    const isLangRU = lang === 'ru';
    const [isHadden, hideHelp] = helpState();

    if (isHadden) {
        return null;
    }

    return (
        <Info
            lang={lang}
            onClose={hideHelp}
            unfoldedContent={
                <div>
                    <Container margin="10px 0 0">
                        {isLangRU
                            ? `Записывайте ${
                                recognitionSupport ? 'или диктуйте' : ''
                            }
                        слова, любые которые приходят вам в голову и в голову
                        ваших друзей.`
                            : `Write down ${
                                recognitionSupport ? 'or dictate' : ''
                            } words that come to your mind and to mind of your friends.`}
                    </Container>
                    {lang === 'ru' ? (
                        <Container margin="10px 0 0">
                            Дополнительно к ним можно получить случайные слова
                            нажав на "Найти слова".
                        </Container>
                    ) : null}
                    <Container margin="10px 0 0">
                        {isLangRU
                            ? 'Нажмите на кнопку "Собрать", чтобы получить словосочетания.'
                            : 'Click on the “Montage” button to get phrases.'}
                    </Container>
                    <Container margin="10px 0 0">
                        {isLangRU
                            ? 'Выбирайте те, которые привлекли ваше внимание и дополняйте их для создания образов ранее ещё не проявленных.'
                            : 'Choose those that have attracted your attention and supplement them to create images that have not yet been manifested.'}
                    </Container>
                </div>
            }
            foldedContent={
                <div>
                    {isLangRU
                        ? 'Как завести мотор этой машины?'
                        : 'How to start the engine of this machine?'}
                </div>
            }
        />
    );
}
