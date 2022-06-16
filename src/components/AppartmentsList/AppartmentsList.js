import React from 'react';
import AppartmentCard from '../AppartmentCard/AppartmentCard';

import './AppartmentsList.css';

function AppartmentsList({ appartments, selectedAppartment}) {
	function sortAppartments() {
		if(selectedAppartment) {
			const sortedList = appartments.filter(apart => apart.id !== selectedAppartment);
			const findedAppart = appartments.find(apart => apart.id === selectedAppartment);
			return [findedAppart, ...sortedList]
		}

		return appartments;
	}
	
	return (
		<div className='appartments-list'>
			{sortAppartments().map(appartment => (
				<AppartmentCard appartment={appartment} />
			))}
		</div>
	);
}

export default AppartmentsList;
