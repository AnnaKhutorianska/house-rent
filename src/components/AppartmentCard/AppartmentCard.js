import React from 'react';

import './AppartmentCard.css'

function AppartmentCard({ appartment }) {
	return(
        <div className='appartment-card'>
            <img className='appartment-card-img' src={appartment.image} alt={appartment.title} />
            <p>{appartment.price}</p>
            <p>{appartment.title}</p>
        </div>
    );
}

export default AppartmentCard;
