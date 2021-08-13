import { h, FunctionalComponent } from 'preact';
import { useContext, useCallback } from 'preact/hooks';

import useLayoutActions from '@hooks/useLayoutActions';
import StateContext from '@contexts/stateContext';

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

const LangChanger: FunctionalComponent = () => {
    const { Layout: { lang } } = useContext(StateContext);
    const { changeLang } = useLayoutActions();

    const isDevice = isTouchDevice();

    const onChange = useCallback(
        <T extends HTMLElement>(e: React.MouseEvent<T> | React.ChangeEvent<T>) => {
            const newLang = (e.target as HTMLSelectElement).value
                ? (e.target as HTMLSelectElement).value
                : (e.target as HTMLElement).dataset.value;
                changeLang(newLang as typeof lang);
            document.documentElement.lang = newLang;
        },
        [changeLang]
    );

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
