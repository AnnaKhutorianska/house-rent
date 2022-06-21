import React from 'react';

import './AppartmentCard.css'

function AppartmentCard({ appartment }) {
    function getImageSrc() {
        if (appartment.image?.originFileObj) {
            return URL.createObjectURL(appartment.image.originFileObj);
        }

        return appartment.image;
    }

	return(
        <div className='appartment-card'>
            <div className='appartment-card-img-wrapper'>
                <img className='appartment-card-img' src={getImageSrc()} alt={appartment.title} />
                <p className='appartment-card-price'>{appartment.price}/доба</p>
            </div>
            <div className='appartment-card-info'>
                <p className='appartment-card-title'>{appartment.title}</p>
                <p className='appartment-card-address'>{appartment.address}</p>
            </div>
        </div>
    );
}

export default AppartmentCard;
