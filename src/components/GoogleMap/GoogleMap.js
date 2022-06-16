import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
	height: '480px',
	flex: 12,
};

const center = {
	lat: 50.450001,
	lng: 30.523333,
};

function Map({ appartments }) {
	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: 'AIzaSyApkTyMro811OVJvs9Y5pktnFZWTPeHsA8',
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
			zoom={10}
			onLoad={onLoad}
			onUnmount={onUnmount}
		>
			{/* Child components, such as markers, info windows, etc. */}
			<Marker position={{ lat: 50.44163, lng: 30.5148065 }} />
      {appartments.map(appartment => <Marker key={appartment.key} position={{ lat: appartment.coordinates.lat, lng: appartment.coordinates.lng }}/>)}
			<></>
		</GoogleMap>
	) : (
		<></>
	);
}

export default React.memo(Map);
