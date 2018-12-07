import styled from 'styled-components';
import { Link } from '../../styles/components';

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
    margin: 24px 0;
`;

export const DownloadLink = styled(Link)`
    margin-right: 24px;
`;
