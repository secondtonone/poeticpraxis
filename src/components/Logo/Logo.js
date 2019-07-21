import React from 'react';

import { LogoLink } from '../../styles/components';

import LogoBlack from '../../../public/img/Logo.svg';
import LogoWhite from '../../../public/img/Logo-white.svg';


const Logo = ({ variant = 'light', height = 24 }) => {
    return (
        <LogoLink to="/">
            <img
                height={height}
                src={variant === 'light' ? LogoBlack : LogoWhite}
                alt="Logo"
            />
        </LogoLink>
    );
};

export default Logo;
