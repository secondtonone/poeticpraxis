import styled from 'styled-components';
import { show } from '@styles/animations';

const MainContent = styled.main`
  padding-top: 72px;
  height: 100%;
  min-height: 100vh;

  @media (max-width: 600px) {
    padding: 0 0 100px 0;
  }
`;

const Page = styled.div`
  position: absolute;
  top: 0;
  z-index: 1000;
  min-height: 100%;
  width: 100%;
  background-color: ${({ theme }) => theme.primaryColor};
  color: ${({ theme }) => theme.secondColor};
  transition: color 0.3s, background-color 0.3s;

  /* opacity: 0;
  animation-name: ${show};
  animation-duration: 1.5s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-timing-function: ease-in; */
`;

export { MainContent, Page };
