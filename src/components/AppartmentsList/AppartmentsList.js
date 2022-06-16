import React from 'react';
import AppartmentCard from '../AppartmentCard/AppartmentCard';

import './AppartmentsList.css';

function AppartmentsList({ appartments }) {
	return (
		<div className='appartments-list'>
			{appartments.map(appartment => (
				<AppartmentCard appartment={appartment} />
			))}
		</div>
	);
}

export default AppartmentsList;
