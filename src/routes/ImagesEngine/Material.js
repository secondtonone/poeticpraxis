import { h } from 'preact';

import { stringToWords } from '@modules/imaged';

import wordByNumber from '@utils/wordByNumber';
import isSupportRecognition from '@utils/isSupportRecognition';
import isTouchDevice from '@utils/isTouchDevice';

import { translations } from './translations';

import Button from '@components/Button';

import WordsIcon from '@icons/Words';

import {
    Container,
    Flex,
    List,
    TextMinor,
} from '@styles/components';


const ImagesEngineMaterial = ({
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
