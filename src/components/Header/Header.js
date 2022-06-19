import React from 'react';

import Logo from '../Logo/Logo';
import ButtonRent from '../ButtonRent/ButtonRent';

import './Header.css';

function Header({ setNewAppartment }) {
	return (
		<div className="header-bgn">
			<div className="container header">
				<Logo />
				<ButtonRent setNewAppartment={setNewAppartment} />
			</div>
		</div>
	);
}

export default Header;
