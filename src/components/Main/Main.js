import React, { useState } from 'react';

import GoogleMap from '../GoogleMap/GoogleMap';
import AppartmentsList from '../AppartmentsList/AppartmentsList';

import './Main.css';

function Main({ appartments, setMapBounds, mapBounds }) {
	const [selectedAppartment, setSelectedAppartment] = useState(null);
	const [mapCenter, setMapCenter] = useState({
		lat: 50.438964,
		lng: 30.5158093,
	});

	function handleClick(id) {
		setSelectedAppartment(id);
		setMapCenter(()=> {
			const selectedAppart =  appartments.find(appart => appart.id === id);
			return selectedAppart.coordinates;
		})
	}

	return (
		<div className="main">
			<GoogleMap
				appartments={appartments}
				handleClick={handleClick}
				selectedAppartment={selectedAppartment}
				setMapBounds={setMapBounds}
				mapCenter={mapCenter}
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
