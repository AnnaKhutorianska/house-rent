import React, { useState } from 'react';
import { nanoid } from 'nanoid'
import Geocode from "react-geocode";
import { Button, Modal, Input } from 'antd';

import Notification from '../Notification/Notification';

import './ButtonRent.css';

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
Geocode.setLanguage("ua");
Geocode.setRegion("ua");
Geocode.setLocationType("ROOFTOP");

function ButtonRent({ setNewAppartment }) {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [appartInfo, setAppartInfo] = useState({});
	const [isError, setIsError] = useState(false);

	function hangleChange(e) {
		const {name, value} = e.target;
		setAppartInfo(prevInfo => ({
			...prevInfo,
			[name]: value
		}))
	}
	
	function toogleModal() {
		setIsModalVisible((prev) => !prev);
	}

	function handleOk() {
		Geocode.fromAddress(appartInfo.address)
			.then(response => {
			  const { lat, lng } = response.results[0].geometry.location;
			  return { lat, lng };
			})
			.then(coord => {
				setNewAppartment({ ...appartInfo, coordinates: coord, id:nanoid() })
				setAppartInfo({})
			})
			.catch(error => setIsError(prev => !prev))

		toogleModal();
	}

	return (
		<>
			<Button type="primary" onClick={toogleModal} className="button-rent">
				Здати в оренду &#x271A;
			</Button>
			<Modal
				title="Додати оголошення"
				visible={isModalVisible}
				onOk={handleOk}
				onCancel={toogleModal}
			>
				<div className='button-rent-input'>
					<p className='button-rent-input-label'>Короткий опис</p>
					<Input
						name="title"
						value={appartInfo.title}
						onChange={hangleChange}
						placeholder="Input description"
					/>
				</div>
				<div className='button-rent-input'>
					<p className='button-rent-input-label'>Ціна за добу</p>
					<Input
						name="price"
						value={appartInfo.price}
						onChange={hangleChange}
						placeholder="Input price"
					/>
				</div>
				<div className='button-rent-input'>
					<p className='button-rent-input-label'>Адреса</p>
					<Input
						name="address"
						value={appartInfo.address}
						onChange={hangleChange}
						placeholder="Input city, street"
					/>
				</div>
				<div>
					<p className='button-rent-input-label'>Посилання на зображення</p>
					<Input
						name="image"
						value={appartInfo.image}
						onChange={hangleChange}
						placeholder="Input image link"
					/>
				</div>
			</Modal>
			{isError && <Notification setIsError={setIsError} />}
		</>
	);
}

export default ButtonRent;
