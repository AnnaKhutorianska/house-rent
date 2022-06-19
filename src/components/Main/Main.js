import React, { useState } from 'react';

import GoogleMap from '../GoogleMap/GoogleMap';
import AppartmentsList from '../AppartmentsList/AppartmentsList';
// import appartments from '../../appartments';

import './Main.css';

function Main({ appartments, setMapBounds, mapBounds }) {
	const [selectedAppartment, setSelectedAppartment] = useState(null);
	
	const handleClick = (id) => setSelectedAppartment(id);

	return (
		<div className='main'>
			<GoogleMap
				appartments={appartments}
				handleClick={handleClick}
				selectedAppartment={selectedAppartment}
				setMapBounds={setMapBounds}
			/>
			<AppartmentsList
				appartments={appartments}
				selectedAppartment={selectedAppartment}
				mapBounds={mapBounds}
			/>
		</div>
	);
}

export default Main;
