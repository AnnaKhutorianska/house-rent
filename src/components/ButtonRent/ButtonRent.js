import React, { useState } from 'react';
import { nanoid } from 'nanoid'
import Geocode from "react-geocode";
import { Button, Modal, Input } from 'antd';

import Notification from '../Notification/Notification';

import './ButtonRent.css';

Geocode.setApiKey('');
Geocode.setLanguage("ua");
Geocode.setRegion("ua");
Geocode.setLocationType("ROOFTOP");

function ButtonRent({ setNewAppartment }) {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [appartInfo, setAppartInfo] = useState({});

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
			.catch(error => {
				console.log(error);
			return <Notification error={error}/>})

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
				<div>
					<p>Короткий опис</p>
					<Input
						name="title"
						value={appartInfo.title}
						onChange={hangleChange}
						placeholder="Input description"
					/>
				</div>
				<div>
					<p>Ціна за добу</p>
					<Input
						name="price"
						value={appartInfo.price}
						onChange={hangleChange}
						placeholder="Input price"
					/>
				</div>
				<div>
					<p>Адреса</p>
					<Input
						name="address"
						value={appartInfo.address}
						onChange={hangleChange}
						placeholder="Input city, street"
					/>
				</div>
				<div>
					<p>Посилання на зображення</p>
					<Input
						name="image"
						value={appartInfo.image}
						onChange={hangleChange}
						placeholder="Input image link"
					/>
				</div>
			</Modal>
		</>
	);
}

export default ButtonRent;
