import React, { useState } from 'react';
import { nanoid } from 'nanoid'
import Geocode from 'react-geocode';
import { Button, Modal, Input, Form } from 'antd';

import Notification from '../Notification/Notification';

import './ButtonRent.css';

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
Geocode.setLanguage('ua');
Geocode.setRegion('ua');
Geocode.setLocationType('ROOFTOP');

function ButtonRent({ setNewAppartment }) {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isError, setIsError] = useState(false);
	const [form] = Form.useForm();

	function toogleModal() {
		setIsModalVisible((prev) => !prev);
	}

	function onCreate(values) {
		Geocode.fromAddress(values.address)
			.then(response => {
				const { lat, lng } = response.results[0].geometry.location;
				return { lat, lng };
			})
			.then(coord => {
				setNewAppartment({ ...values, coordinates: coord, id: nanoid() });
				form.resetFields();
				toogleModal();
			})
			.catch(() => setIsError(prev => !prev))

	}

	function handleOk() {
		form
			.validateFields()
			.then(values => {
				onCreate(values);
			})
			.catch(info => {
				console.log('Validate Failed:', info);
			});
	}

	return (
		<>
			<Button type='primary' onClick={toogleModal} className='button-rent'>
				Здати в оренду &#x271A;
			</Button>
			<Modal
				title='Додати оголошення'
				visible={isModalVisible}
				onOk={handleOk}
				onCancel={toogleModal}
			>
				<Form
					form={form}
					layout='vertical'
					name='Додати оголошення'
				>
					<Form.Item
						name='title'
						label='Короткий опис'
						rules={[
							{
								required: true,
								message: 'Додайте опис',
							},
						]}
					>
						<Input
							placeholder='Input description'
						/>
					</Form.Item>

					<Form.Item
						name='price'
						label='Ціна за добу'
						rules={[
							{
								required: true,
								message: 'Додайте ціну',
							},
						]}
					>
						<Input
							type='number'
							placeholder='Input price'
						/>
					</Form.Item>

					<Form.Item
						name='address'
						label='Адреса'
						rules={[
							{
								required: true,
								message: 'Додайте адресу',
							},
						]}
					>
						<Input
							placeholder='Input address'
						/>
					</Form.Item>

					<Form.Item
						name='image'
						label='image'
						rules={[
							{
								required: true,
								message: 'Додайте посилання на зображення',
							},
						]}
					>
						<Input
							placeholder='Input image'
						/>
					</Form.Item>
				</Form>
			</Modal>
			{isError && <Notification setIsError={setIsError} />}
		</>
	);
}

export default ButtonRent;
