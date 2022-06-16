import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
	height: '480px',
	flex: 12,
};

const center = {
	lat: 50.4446159,
	lng: 30.5172036,
};

const green_marker = 'http://maps.google.com/mapfiles/kml/paddle/grn-blank.png';
const blue_marker = 'http://maps.google.com/mapfiles/kml/paddle/blu-blank.png';

function Map({ appartments, handleClick, selectedAppartment }) {
	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
	});

	const [map, setMap] = React.useState(null);

	const onLoad = React.useCallback(function callback(map) {
		const bounds = new window.google.maps.LatLngBounds(center);
		map.fitBounds(bounds);
		setMap(map);
	}, []);

	const onUnmount = React.useCallback(function callback(map) {
		setMap(null);
	}, []);

	return isLoaded ? (
		<GoogleMap
			mapContainerStyle={containerStyle}
			center={center}
			zoom={13}
			onLoad={onLoad}
			onUnmount={onUnmount}
		>
			{/* Child components, such as markers, info windows, etc. */}
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
	) : (
		<></>
	);
}

export default React.memo(Map);
