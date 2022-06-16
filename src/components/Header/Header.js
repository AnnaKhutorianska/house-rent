import React from 'react';
import ButtonRent from '../ButtonRent/ButtonRent';

import Logo from '../Logo/Logo';

import './Header.css';

function Header() {
	return (
		<div className="header-bgn">
			<div className="container header">
                <Logo />
                <ButtonRent />
            </div>
		</div>
	);
}

export default Header;
