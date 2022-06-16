import React from 'react';

import GoogleMap from '../GoogleMap/GoogleMap';
import AppartmentsList from '../AppartmentsList/AppartmentsList';
import appartments from '../../appartments';

import './Main.css';

function Main() {
	return (
		<div className='main'>
			<GoogleMap appartments={appartments} />
			<AppartmentsList appartments={appartments} />
		</div>
	);
}

export default Main;
