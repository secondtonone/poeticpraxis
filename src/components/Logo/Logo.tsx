import { FunctionalComponent } from 'preact';
import { useContext } from 'preact/hooks';
import StateContext from '@contexts/stateContext';

import RouteLink from '@components/RouteLink';
import LogoBlack from '@public/img/Logo.svg';
import LogoWhite from '@public/img/Logo-white.svg';

interface LogoProps {
    height?: number
    width?: number
}

const Logo:FunctionalComponent<LogoProps> = ({ height = 24, width = 62 }) => {
    const { Layout: { variant } } = useContext(StateContext);

    return (<RouteLink to="/">
        <img
            height={height}
            width={width}
            src={variant === 'light' ? LogoBlack : LogoWhite}
            alt="Logo"
        />
    </RouteLink>
)};

export default Logo;
