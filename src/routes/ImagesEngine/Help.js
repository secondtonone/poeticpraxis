import { h } from 'preact';

import { translations } from '../../components/Workfield/translations';

import Info from '../../components/Info';

import { Container, Flex } from '../../styles/components';
import Widgets from '../../components/IconSVG/Widgets';

import { maxMatchMedia, isSupportRecognition } from '../../utils';

export default function Help({ lang = 'ru' }) {
    const maxMedia600 = maxMatchMedia(600);
    const containerWidth = maxMedia600 ? '100%' : '33%';
    const recognitionSupport = isSupportRecognition();

    return (
        <Info
            lang={lang}
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
                        Нажмите на <Widgets _small />, чтобы получить
                        словосочетания.
                    </Container>
                    <Container margin="10px 0 0">
                        Выбирайте те, которые привлекли ваше внимание и дополняйте их для создания образов ранее ещё не проявленных.
                    </Container>
                </div>
            }
            foldedContent={<div>С чего начать?</div>}
        />
    );
}
