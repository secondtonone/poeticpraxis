import styled from 'styled-components';
import hexToRgb from '@utils/hexToRgb';

const PageHeader = styled.header<{boundHeight: number}>`
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1001;
  width: 100%;
  background: linear-gradient(
    rgba(${({theme}) => hexToRgb(theme.primaryColor).join(',')}, 0.9),
    rgba(${({theme}) => hexToRgb(theme.primaryColor).join(',')}, 0.1)
  );
  padding: 0 16px;
  transform: translateY(0);
  transition: transform 0.5s ease-in;

  @media (max-width: 600px) {
    position: fixed;
    display: block;
    padding: 8px;
    bottom: 0;
    background: linear-gradient(
      rgba(
          ${({theme}) => hexToRgb(theme.primaryColor).join(',')},
          0.5
      ),
      rgba(
          ${({theme}) => hexToRgb(theme.primaryColor).join(',')},
          0.8
      ),
      rgba(${({theme}) => hexToRgb(theme.primaryColor).join(',')}, 1)
    );
  }

  @media (max-width: 600px) and (max-height: ${({boundHeight}) => boundHeight - 50}px) {
    transform: translateY(120%);
  }
`;

const Logo = styled.img<{ height: number }>`
  display: block;
  position: relative;
  height: ${({height}) => (height ? `${height}px` : '100%')};
`;

const Block = styled.div`
  display: block;

  @media (max-width: 600px) {
    display: none;
  }
`;

const ContentField = styled.div`
  position: relative;
  display: flex;

  @media (max-width: 600px) {
    position: relative;
    top: auto;
    right: auto;
    text-align: center;
  }
`;

export { PageHeader, ContentField, Logo, Block };
