import { useEffect, useState } from 'react';

import appartments from './appartments';
import Main from './components/Main/Main';
import Header from './components/Header/Header';

import 'antd/dist/antd.css';
import './App.css';

function App() {
	const [appartmentsList, setAppartmentsList] = useState([]);
	const [mapBounds, setMapBounds] = useState('');

	useEffect(() => {
		setAppartmentsList(appartments);
	}, [])

	function updateAppartmentsList(newAppartment) {
		setAppartmentsList(prev => [...prev, newAppartment]);
	}

	return (
		<div className="App">
			<Header setNewAppartment={updateAppartmentsList} />
			<Main
				appartments={appartmentsList}
				setMapBounds={setMapBounds}
				mapBounds={mapBounds}
			/>
		</div>
	);
}

export default App;
