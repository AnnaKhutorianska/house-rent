import React , { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

import './GoogleMap.css';

const center = {
	lat: 50.438964,
	lng: 30.5158093,
};

const green_marker = 'http://maps.google.com/mapfiles/kml/paddle/grn-blank.png';
const blue_marker  = 'http://maps.google.com/mapfiles/kml/paddle/blu-blank.png';

function Map({ appartments, handleClick, selectedAppartment, setMapBounds }) {
	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: '',
	});

	const [map, setMap] = useState(null);

	const onLoad = useCallback(map =>  {
		const bounds = new window.google.maps.LatLngBounds(center);
		map.fitBounds(bounds);
		setMap(map);

		let swPoint = bounds.getSouthWest();
		let nePoint = bounds.getNorthEast();
		let swLat = swPoint.lat();
		let swLng = swPoint.lng();
		let neLat = nePoint.lat();
		let neLng = nePoint.lng();

		setMapBounds({swLat, swLng, neLat, neLng})
	}, []);

	const onUnmount = useCallback(() => {
		setMap(null);
	}, []);

	return isLoaded ? (
		<GoogleMap
			mapContainerClassName='map-container'
			defaultCenter={center}
			zoom={10}
			onLoad={onLoad}
			onUnmount={onUnmount}
			onDragEnd={() => {
				let bounds = map?.getBounds();
				let swPoint = bounds?.getSouthWest();
				let nePoint = bounds?.getNorthEast();
				let swLat = swPoint?.lat();
				let swLng = swPoint?.lng();
				let neLat = nePoint?.lat();
				let neLng = nePoint?.lng();
				setMapBounds({swLat, swLng, neLat, neLng})
			}}
			onZoomChanged={() => {
				let bounds = map?.getBounds();
				let swPoint = bounds?.getSouthWest();
				let nePoint = bounds?.getNorthEast();
				let swLat = swPoint?.lat();
				let swLng = swPoint?.lng();
				let neLat = nePoint?.lat();
				let neLng = nePoint?.lng();
				setMapBounds({swLat, swLng, neLat, neLng})
			}}
		>
			{appartments.map(appartment => (
				<Marker
					icon={appartment.id === selectedAppartment ? blue_marker : green_marker}
					key={appartment.key}
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
