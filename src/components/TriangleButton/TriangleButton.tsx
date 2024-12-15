import type { FunctionalComponent } from 'preact';
import styled from 'styled-components';

import { TextAccent } from '@styles/components';
import Button, { type ButtonProps } from '@components/Button';
import Container from '@components/Container';
import BigTriangle from '@icons/BigTriangle';

const StyledTriangleButton = styled(Button)`
    position: relative;
`;

const TriangleButton: FunctionalComponent<ButtonProps> = ({ children, ...props }) => {
  return (
    <StyledTriangleButton _action _transparent {...props}>
      <Container position="absolute" top="-12px" left="0">
        <TextAccent>
          <BigTriangle _xxxlarge />
        </TextAccent>
      </Container>
      {children}
    </StyledTriangleButton>
  );
};

export default TriangleButton;
