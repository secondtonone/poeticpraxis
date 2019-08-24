import styled from 'styled-components';
import { Link } from '../../styles/components';
import Button from '../Button';

export const Container = styled.div`
    display: flex;
    justify-content: space-between;
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
`;

export const DownloadLink = styled(Link)`
    margin: ${(props) => props.margin ? props.margin : '0'};
    display: flex;
    display: flex;
    align-items: flex-end;
`;
