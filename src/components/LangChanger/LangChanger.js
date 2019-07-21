import React from 'react';

import Select from '../Select';
import { Flex } from '../../styles/components';

import { translations } from './translations';

const LangChanger = ({ lang = 'ru', changeLang }) => {
    const langOptions = [
        { title: 'Русский', value: 'ru' },
        { title: 'English', value: 'en' }
    ];

    return (
        <Flex justify="space-between">
            {translations[lang].settings['LANG']}
            <Select
                weight="400"
                id="lang"
                value={lang}
                options={langOptions}
                onChange={(e) => {
                    changeLang(e.target.value);
                    document.documentElement.lang = e.target.value;
                }}
            />
        </Flex>
    );
};

export default LangChanger;
