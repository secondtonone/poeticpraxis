import { h } from 'preact';
import styled from 'styled-components';

import { TextAccent } from '@styles/components';
import Button from '@components/Button';
import Container from '@components/Container';
import BigTriangle from '@icons/BigTriangle';

const TriangleButton = styled(Button)`
    position: relative;
`;

export default function ({ children, ...props }) {
    return (
        <TriangleButton _action _transparent {...props}>
            <Container position="absolute" top="-12px" left="0">
                <TextAccent>
                    <BigTriangle _xxxlarge />
                </TextAccent>
            </Container>
            {children}
        </TriangleButton>
    );
}
