import { h } from 'preact';
import { useCallback } from 'preact/compat';

import { HiddenSelect } from '@styles/components';
import Dropdown from '@components/Dropdown';
import Button from '@components/Button';
import Flex from '@components/Flex';

import isTouchDevice from '@utils/isTouchDevice';

import LangIcon from '@icons/Lang';

const langOptions = [
    { title: 'Русский', value: 'ru' },
    { title: 'English', value: 'en' }
];

const LangChanger = ({ lang = 'ru', changeLang }) => {
    const onChange = useCallback((e) => {
        changeLang(e.target.value);
        document.documentElement.lang = e.target.value;
    }, [changeLang]);

    const isDevice = isTouchDevice();

    return (
        <Flex justify="center">
            {isDevice ? (
                <label htmlFor="lang">
                    <LangIcon _middle />
                    <HiddenSelect id="lang" value={lang} onChange={onChange}>
                        {langOptions.map(({ title, value }, index) => {
                            return (
                                <option key={index} value={value}>
                                    {title}
                                </option>
                            );
                        })}
                    </HiddenSelect>
                </label>
            ) : (
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
            )}
        </Flex>
    );
};

export default LangChanger;
