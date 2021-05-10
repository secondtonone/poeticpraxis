import { h } from 'preact';

import RouteLink from '@components/RouteLink';
import LogoBlack from '@public/img/Logo.svg';
import LogoWhite from '@public/img/Logo-white.svg';

const Logo = ({ variant = 'light', height = 24, width = 62 }) => {
    return (
        <RouteLink to="/">
            <img
                height={height}
                width={width}
                src={variant === 'light' ? LogoBlack : LogoWhite}
                alt="Logo"
            />
        </RouteLink>
    );
};

export default Logo;
