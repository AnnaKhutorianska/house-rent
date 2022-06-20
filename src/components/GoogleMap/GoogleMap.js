import React , { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

import './GoogleMap.css';

const green_marker = 'http://maps.google.com/mapfiles/kml/paddle/grn-blank.png';
const blue_marker  = 'http://maps.google.com/mapfiles/kml/paddle/blu-blank.png';

function Map({ appartments, handleClick, selectedAppartment, setMapBounds, mapCenter }) {
	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
	});

	const [map, setMap] = useState(null);

	const onLoad = useCallback(map =>  {
		const bounds = new window.google.maps.LatLngBounds(mapCenter);
		map.fitBounds(bounds);
		setMap(map);
		findCoordinates(bounds)
	}, [])

	const onUnmount = useCallback(() => {
		setMap(null);
	}, [])

	function findCoordinates(bounds) {
		let swPoint = bounds?.getSouthWest();
		let nePoint = bounds?.getNorthEast();
		let swLat = swPoint?.lat();
		let swLng = swPoint?.lng();
		let neLat = nePoint?.lat();
		let neLng = nePoint?.lng();
		setMapBounds({swLat, swLng, neLat, neLng})
	}

	return isLoaded ? (
		<GoogleMap
			mapContainerClassName='map-container'
			center={mapCenter}
			zoom={10}
			onLoad={onLoad}
			onUnmount={onUnmount}
			onDragEnd={() => {
				let bounds = map?.getBounds();
				findCoordinates(bounds)
			}}
			onZoomChanged={() => {
				let bounds = map?.getBounds();
				findCoordinates(bounds)
			}}
		>
			{appartments.map(appartment => (
				<Marker
					icon={appartment.id === selectedAppartment ? blue_marker : green_marker}
					key={appartment.id}
					position={
						{
							lat: appartment.coordinates.lat, 
							lng: appartment.coordinates.lng
						}
					}
					onClick={handleClick.bind(null, appartment.id)}
				/>))}
			<></>
		</GoogleMap>
	) : null;
}

export default React.memo(Map);
