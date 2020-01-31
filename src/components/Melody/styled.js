import styled from 'styled-components';
import { Link } from '../../styles/components';

export const Container = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const PlayerContainer = styled.div`
    padding: 16px 24px;
    width: 100%;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 0 auto;
    background: ${(props) =>
        props.theme.name === 'dark'
            ? 'linear-gradient( rgba(25,25,25,.1),rgba(25,25,25,.9) )'
            : 'linear-gradient(rgba(249,248,247,.1),rgba(249,248,247,.9))'};
`;

export const LoaderConatiner = styled.div`
    display: flex;
    justify-content: center;
    margin: 25% auto 0;
`;

export const LinkConatiner = styled.div`
    display: flex;
    justify-content: flex-start;
    margin: 36px 0 24px;
    align-items: center;
`;

export const Title = styled.h1`
    line-height: 32px;
    font-size: 22px;
    letter-spacing: 0px;
    font-weight: 400;
    margin: 0;
    padding-top: 0;
`;

export const DownloadLink = styled(Link)`
    margin: ${(props) => (props.margin ? props.margin : '0')};
    display: flex;
    display: flex;
    align-items: flex-end;
`;
