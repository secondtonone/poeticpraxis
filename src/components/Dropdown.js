import { h } from 'preact';
import { useState, useEffect, useRef, useCallback } from 'preact/compat';

import { DropdownList } from '@styles/components';
import Flex from '@components/Flex';
import Container from '@components/Container';

export default function Dropdown({
    isOpen = false,
    title,
    side,
    top,
    options,
    value,
    onChange,
}) {
    const [isListOpen, setVisibility] = useState(isOpen);
    const dropdown = useRef();
    const lang = value;

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdown.current && !dropdown.current.contains(e.target)) {
                setVisibility(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const closeList = useCallback(() => {
        setVisibility(false);
    }, []);

    const toggleDropdown = useCallback((e) => {
        e.preventDefault();
        setVisibility((isOpen) => !isOpen);
    }, []);

    const itemHandler = useCallback((e) => {
        onChange(e.target.dataset.value);
        closeList();
    }, []);

    return (
        <Container>
            <Flex onClick={toggleDropdown}>{title}</Flex>

            {isListOpen && (
                <DropdownList
                    side={side || 'right'}
                    top={top || '32px'}
                    tabIndex="0"
                    onBlur={closeList}
                    ref={dropdown}>
                    {options.map(({ title, value }, index) => {
                        return (
                            <DropdownList.ListItem
                                active={value === lang}
                                data-value={value}
                                key={index}
                                onClick={itemHandler}>
                                {title}
                            </DropdownList.ListItem>
                        );
                    })}
                </DropdownList>
            )}
        </Container>
    );
}
