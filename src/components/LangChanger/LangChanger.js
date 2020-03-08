import { h } from 'preact';
import { useCallback } from 'preact/compat';

import { Flex, HiddenSelect } from '../../styles/components';
import Dropdown from '../Dropdown';
import Button from '../Button';

import { isTouchDevice } from '../../utils';

import LangIcon from '../IconSVG/Lang';

const langOptions = [
    { title: 'Русский', value: 'ru' },
    { title: 'English', value: 'en' }
];

const LangChanger = ({ lang = 'ru', changeLang }) => {
    
    const onChange = useCallback((value) => {
        changeLang(value);
        document.documentElement.lang = value;
    }, [changeLang]);

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
        </Flex>
    );
};

export default LangChanger;
