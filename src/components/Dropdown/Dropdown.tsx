import { FunctionalComponent } from 'preact';
import { useState, useEffect, useRef, useCallback } from 'preact/compat';
import styled from 'styled-components';

import Flex from '@components/Flex';
import Container from '@components/Container';

interface DropdownProps {
    isOpen?: boolean
    title: React.ReactNode
    side?: string
    top?: string
    options: Array<{ title: string, value: string }>
    value: string
    onChange: (e: React.MouseEvent | React.ChangeEvent) => void
}

const Dropdown: FunctionalComponent<DropdownProps> = ({
    isOpen = false,
    title,
    side,
    top,
    options,
    value,
    onChange,
}) => {
    const [isListOpen, setVisibility] = useState<boolean>(isOpen);
    const dropdown = useRef<HTMLUListElement>(null);
    const lang = value;

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (dropdown.current && !dropdown.current.contains(target)) {
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

    const toggleDropdown: React.MouseEventHandler<HTMLDivElement> = useCallback((e) => {
        e.preventDefault();
        setVisibility((isOpen) => !isOpen);
    }, []);

    const itemHandler: React.MouseEventHandler<HTMLLIElement> = useCallback((e) => {
        onChange(e);
        closeList();
    }, []);

    return (
        <Container>
            <Flex onClick={toggleDropdown}>{title}</Flex>

            {isListOpen && (
                <DropdownList
                    side={side || 'right'}
                    top={top || '32px'}
                    tabIndex={0}
                    onBlur={closeList}
                    ref={dropdown}>
                    {options.map(({ title, value }, index) => {
                        return (
                            <ListItem
                                active={value === lang}
                                data-value={value}
                                key={index}
                                onClick={itemHandler}>
                                {title}
                            </ListItem>
                        );
                    })}
                </DropdownList>
            )}
        </Container>
    );
}

const DropdownList = styled.ul<React.HTMLAttributes<HTMLUListElement> & Pick<DropdownProps, 'top' | 'side'>>`
    position: absolute;
    top: ${(props) => props.top || '-3px'};
    ${(props) => `${props.side || 'left'}: 8px;`}
    list-style: none;
    background: ${(props) => props.theme.primaryColor};
    margin: 0;
    padding: 0;
    width: 100%;
    min-width: 150px;
    box-shadow: 5px 4px 25px 3px rgba(0, 0, 0, 0.1);
    max-height: 200px;
    outline: none;
    ${(props) =>
        props.theme.name === 'dark'
            ? `background: ${props.theme.grayDarkColor};`
            : ''}
    &:focus {
        outline: none;
    }
`;

const ListItem = styled.li<{active: boolean} & React.HTMLAttributes<HTMLLIElement>>`
    margin: 0;
    padding: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${(props) =>
        props.active ? props.theme.accentColor : props.theme.secondColor};
`;

export default Dropdown;
