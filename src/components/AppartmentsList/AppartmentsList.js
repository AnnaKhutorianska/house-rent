import React from 'react';
import AppartmentCard from '../AppartmentCard/AppartmentCard';

import './AppartmentsList.css';

function AppartmentsList({ appartments, selectedAppartment, mapBounds }) {
	function checkBounds(appartments, bounds) {
		return appartments.filter((apart) => {
			if (
				apart.coordinates.lat <= bounds.neLat &&
				apart.coordinates.lat >= bounds.swLat &&
				apart.coordinates.lng >= bounds.swLng &&
				apart.coordinates.lng <= bounds.neLng
			) {
				return apart;
			}
		});
	}

	function sortAppartments() {
		if (selectedAppartment) {
			const sortedList = appartments.filter((apart) => apart.id !== selectedAppartment);
			const findedAppart = appartments.find((apart) => apart.id === selectedAppartment);
			return [findedAppart, ...sortedList];
		}

		return appartments;
	}

	return (
		<div className="appartments-list">
			{checkBounds(sortAppartments(), mapBounds).map((appartment) => (
				<AppartmentCard appartment={appartment} />
			))}
		</div>
	);
}

export default AppartmentsList;
