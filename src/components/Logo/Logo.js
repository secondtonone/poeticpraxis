import React from 'react';

import RouteLink from '../RouteLink';
import LogoBlack from '../../../public/img/Logo.svg';
import LogoWhite from '../../../public/img/Logo-white.svg';

const Logo = ({ variant = 'light', height = 24 }) => {
    return (
        <RouteLink to="/">
            <img
                height={height}
                src={variant === 'light' ? LogoBlack : LogoWhite}
                alt="Logo"
            />
        </RouteLink>
    );
};

export default Logo;
