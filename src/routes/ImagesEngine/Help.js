import { h } from 'preact';

import { translations } from '../../components/Workfield/translations';
import useSessionStorage from '../../hooks/useSessionStorage';

import Info from '../../components/Info';

import { Container } from '../../styles/components';

import { maxMatchMedia, isSupportRecognition } from '../../utils';

const helpState = () => {
    const [valueSessionStorage, setValueSessionStorage] = useSessionStorage(
        'isHideImagesEngineHelp'
    );

    return [valueSessionStorage, () => setValueSessionStorage(true)];
}

export default function Help({ lang = 'ru' }) {
    const maxMedia600 = maxMatchMedia(600);
    const containerWidth = maxMedia600 ? '100%' : '33%';
    const recognitionSupport = isSupportRecognition();
    
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
                        Записывайте {recognitionSupport ? 'или диктуйте' : null}{' '}
                        слова, любые которые приходят вам в голову и в голову
                        ваших друзей.
                    </Container>
                    {lang === 'ru' ? (
                        <Container margin="10px 0 0">
                            Дополнительно к ним можно получить случайные слова
                            из словаря.
                        </Container>
                    ) : null}
                    <Container margin="10px 0 0">
                        Нажмите на кнопку внизу, чтобы получить словосочетания.
                    </Container>
                    <Container margin="10px 0 0">
                        Выбирайте те, которые привлекли ваше внимание и
                        дополняйте их для создания образов ранее ещё не
                        проявленных.
                    </Container>
                </div>
            }
            foldedContent={<div>С чего начать?</div>}
        />
    );
}
