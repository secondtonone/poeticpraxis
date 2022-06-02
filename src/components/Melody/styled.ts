import styled from 'styled-components';
import { Link } from '@styles/components';

export const PlayerContainer = styled.div`
  padding: 16px 0;
  width: 666px;
  position: fixed;
  bottom: 0;
  margin: 0 auto;
  background: ${(props) =>
    props.theme.name === 'dark'
      ? 'linear-gradient( rgba(25,25,25,.1),rgba(25,25,25,.9) )'
      : 'linear-gradient(rgba(249,248,247,.1),rgba(249,248,247,.9))'};
  @media (max-width: 600px) {
    bottom: 52px;
    width: 100%;
    padding: 0 24px;
    left: 0;
  }
`;

export const Title = styled.h1`
  line-height: 32px;
  font-size: 22px;
  letter-spacing: 0px;
  font-weight: 400;
  margin: 0;
  padding-top: 0;
`;

export const DownloadLink = styled(Link)<{ margin?: string }>`
  margin: ${(props) => (props.margin ? props.margin : '0')};
  display: flex;
  align-items: flex-end;
`;
