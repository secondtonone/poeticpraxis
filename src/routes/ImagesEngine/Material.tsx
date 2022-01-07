import { FunctionalComponent } from 'preact';

import { stringToWords } from '@modules/imaged';

import wordByNumber from '@utils/wordByNumber';
import isSupportRecognition from '@utils/isSupportRecognition';
import isTouchDevice from '@utils/isTouchDevice';

import { enginePage as translations } from '@translations';

import Langs from '@typings/Langs';

import Button from '@components/Button';
import Flex from '@components/Flex';
import Container from '@components/Container';
import List from '@components/List';

import WordsIcon from '@icons/Words';

import {
    TextMinor,
} from '@styles/components';

interface ImagesEngineMaterialProps {
    lang: Langs
    text: string
    getWords: () => void,
    textarea: React.ReactNode
    recorder: React.ReactNode
}

const ImagesEngineMaterial: FunctionalComponent<ImagesEngineMaterialProps> = ({
    text,
    lang = 'ru',
    getWords,
    textarea,
    recorder
}) => {
    const wordsNumber = stringToWords(text).length;

    const isDevice = isTouchDevice();

    const isRusLang = lang === 'ru';

    return (
        <List _animated>
            {!isDevice && (
                <Container maxWidth="380px" width="100%" margin="0 auto">
                    <Flex
                        justify={
                            isRusLang && isSupportRecognition()
                                ? 'space-between'
                                : 'center'
                        }>
                        {recorder}
                        {isRusLang && (
                            <Button
                                _flat
                                _transparent
                                type="button"
                                onClick={getWords}
                                title={translations[lang].engine['GET']}>
                                <WordsIcon _small padding="0 8px 0 0" />
                                {translations[lang].engine['GET']}
                            </Button>
                        )}
                    </Flex>
                </Container>
            )}
            <div>{textarea}</div>
            <Flex justify="flex-end">
                <TextMinor>
                    {wordsNumber
                        ? `${wordsNumber} ${wordByNumber(
                            lang,
                            wordsNumber,
                            translations[lang].engine['WORDS_AMOUNT']
                        )}`
                        : null}
                </TextMinor>
            </Flex>
        </List>
    );
};

export default ImagesEngineMaterial;
