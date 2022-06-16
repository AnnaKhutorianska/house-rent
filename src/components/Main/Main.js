import React, { useState } from 'react';

import GoogleMap from '../GoogleMap/GoogleMap';
import AppartmentsList from '../AppartmentsList/AppartmentsList';
import appartments from '../../appartments';

import './Main.css';

function Main() {
	const [selectedAppartment, setSelectedAppartment] = useState(null);

	const handleClick = (id) => setSelectedAppartment(id);

	return (
		<div className='main'>
			<GoogleMap appartments={appartments} handleClick={handleClick} selectedAppartment={selectedAppartment} />
			<AppartmentsList appartments={appartments} selectedAppartment={selectedAppartment} />
		</div>
	);
}

export default Main;
