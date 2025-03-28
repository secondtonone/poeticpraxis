import styled, { css } from 'styled-components';
import type { FlattenSimpleInterpolation } from 'styled-components';

import theme from './theme';
import { show, upAlt, downAlt } from './animations';

const SecondaryTitle = styled.h2`
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 8px;
  color: ${(props) => props.theme.secondColor};
`;

const Hint = styled.div`
  font-size: 14px;
  font-weight: 300;
  color: ${(props) => props.theme.secondColor};
  margin: 16px auto;
  text-align: center;
  line-height: 22px;
`;

const LeftedLayout = styled.div`
  margin-left: 100px;
  padding: 32px 0 0;

  @media (max-width: 600px) {
    padding: 101px 0 0;
    margin: 0;
  }

  @media (min-width: 1100px) {
    margin-left: 200px;
  }
`;

const AnimationShow: FlattenSimpleInterpolation = css`
  opacity: 0;
  animation-name: ${show};
  animation-duration: 1s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-timing-function: ease-out;
`;

const AnimationUp: FlattenSimpleInterpolation = css`
  transform: translateY(1000%);
  animation-name: ${upAlt};
  animation-duration: 0.7s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-timing-function: ease-out;
`;

const AnimationDown: FlattenSimpleInterpolation = css`
  transform: translateY(-1000%);
  animation-name: ${downAlt};
  animation-duration: 0.7s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-timing-function: ease-out;
`;

const DesktopHiddenContainer = styled.div`
  display: none;
  @media (max-width: 600px) {
    display: block;
  }
`;

const Link = styled.a<React.HTMLAttributes<HTMLAnchorElement>>`
  color: ${(props) => props.theme.accentColor};
  fill: ${(props) => props.theme.accentColor};
`;

const Footer = styled.footer`
  font-family: ${theme.mainFont};
  line-height: 29px;
  font-size: 14px;
  letter-spacing: 0px;
  font-weight: 300;
  word-spacing: 3px;
  text-align: center;
`;

const FieldLabel = styled.label<{ isHidden?: boolean }>`
  font-size: 18px;
  font-weight: 400;
  color: ${theme.primaryGray};
  font-family: ${theme.mainFont};

  ${(props) => (props.isHidden ? 'opacity: 0;' : 'margin-bottom: 8px;')}
`;

const SimpleTextarea = styled.textarea<React.HTMLAttributes<HTMLTextAreaElement>>``;

const ShowOnHover = styled.div`
  display: none;
  opacity: 0;
  transition: opacity 0.5s;
  pointer-events: none;
`;

const HideOnHover = styled.div`
  display: block;
  opacity: 1;
  transition: opacity 0.5s;
  pointer-events: none;
`;

const HoveredElement = styled.div`
  &:hover ${ShowOnHover} {
    display: block;
    opacity: 1;
  }

  &:hover ${HideOnHover} {
    display: none;
    opacity: 0;
  }
`;

const ActionBar = styled.div<{ minHeight?: number | string }>`
  display: none;

  & button {
    margin-left: 16px;
  }

  ${(props) =>
    props.minHeight
      ? `
        transform: translateY(0);
        transition: transform 0.5s ease-in;`
      : ''}

  @media (max-width: 600px) {
    display: flex;
    position: fixed;
    bottom: 8px;
    right: 8px;
    z-index: 1002;
  }

  @media (max-height: ${(props) =>
    props.minHeight ? props.minHeight : '0'}) {
    transform: translateY(120%);
    display: none;
  }
`;

const Backdrop = styled.div`
  position: fixed;
  height: 100vh;
  z-index: 9999;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${(props) =>
    props.theme.name === 'dark'
      ? 'rgba(0, 0, 0, 0.7)'
      : 'rgba(255, 255, 255, 0.7)'};
`;

const LandingContainer = styled.div`
  margin: 0;
`;

const Mirrored = styled.span`
  transform: scale(-1);
`;

const TextAccent = styled.span`
  color: ${(props) => props.theme.accentColor};
  fill: ${(props) => props.theme.accentColor};
`;

const TextMinor = styled.span`
  color: ${(props) => props.theme.grayColor};
`;

interface ITextConstructor {
  letter?: string | number
  word?: string | number
}

const TextConstructor = styled.span<ITextConstructor>`
  letter-spacing: ${(props) => (props.letter ? props.letter : '0')}px;
  word-spacing: ${(props) => (props.word ? props.word : '0')}px;

  @media (max-width: 800px) {
    letter-spacing: inherit;
    word-spacing: inherit;
  }
`;

const Strong = styled.span`
  font-weight: 400;
`;

const HiddenSelect = styled.select`
  opacity: 0;
  outline: none;
  border: 0;
  padding: 0;
  margin: 0;
  position: absolute;
`;

const BetaSign = styled.div`
  position: relative;

  &::after {
    position: absolute;
    right: -8px;
    top: -5px;
    content: '\\03B2';
    color: ${(props) => props.theme.secondColor};
    font-size: 12px;
  }
`;

interface IBadge {
  top?: number | string; 
  right?: number | string
  isHidden?: boolean
}

const Badge = styled.span<IBadge>`
  position: relative;
  display: inline-block;

  &::after {
    position: absolute;
    top: ${(props) => (props.top ? props.top : '-5px')};
    right: ${(props) => (props.right ? props.right : '-5px')};
    border: 1px solid ${(props) => props.theme.primaryColor};
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${(props) => props.theme.accentColor};
    opacity: ${(props) => props.isHidden? 0 : 1};
    transition: opacity 0.5s;
  }
`;

export {
  Backdrop,
  SecondaryTitle,
  Hint,
  LeftedLayout,
  AnimationShow,
  AnimationUp,
  AnimationDown,
  TextConstructor,
  Link,
  Footer,
  FieldLabel,
  SimpleTextarea,
  LandingContainer,
  TextAccent,
  Strong,
  TextMinor,
  HoveredElement,
  ShowOnHover,
  HideOnHover,
  DesktopHiddenContainer,
  ActionBar,
  Mirrored,
  HiddenSelect,
  BetaSign,
  Badge,
};
