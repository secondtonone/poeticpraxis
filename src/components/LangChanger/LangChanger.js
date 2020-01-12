import { h } from 'preact';

import Select from '../Select';
import { Flex, HiddenSelect } from '../../styles/components';
import Dropdown from '../Dropdown';
import Button from '../Button';

import { translations } from './translations';
import { isTouchDevice } from '../../utils';

import LangIcon from '../IconSVG/Lang';

const LangChanger = ({ lang = 'ru', changeLang, texted = false }) => {
    const langOptions = [
        { title: 'Русский', value: 'ru' },
        { title: 'English', value: 'en' }
    ];

    const onChange = (value) => {
        changeLang(value);
        document.documentElement.lang = value;
    };

    return (
        <Flex justify="center">
            {!isTouchDevice() ? (
                <Dropdown
                    title={
                        <Button type="button" _rounded _transparent _fit>
                            <LangIcon _middle />
                        </Button>
                    }
                    options={langOptions}
                    value={lang}
                    onChange={onChange}
                />
            ) : (
                <Button type="button" _rounded _transparent _fit>
                    <label htmlFor="lang">
                        <LangIcon _middle />
                        <HiddenSelect
                            id="lang"
                            value={lang}
                            onChange={(e) => onChange(e.target.value)}>
                            {langOptions.map(({ title, value }, index) => {
                                return (
                                    <option key={index} value={value}>
                                        {title}
                                    </option>
                                );
                            })}
                        </HiddenSelect>
                    </label>
                </Button>
            )}
            {/* 
            <Select
                weight="400"
                id="lang"
                value={lang}
                options={langOptions}
                onChange={(e) => {
                    changeLang(e.target.value);
                    document.documentElement.lang = e.target.value;
                }}
            /> */}
        </Flex>
    );
};

export default LangChanger;
