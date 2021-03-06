import React, { useRef, useState } from 'react';
import { nanoid } from 'nanoid'
import Geocode from 'react-geocode';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Modal, Input, Form, Upload } from 'antd';
import { Autocomplete } from '@react-google-maps/api';

import Notification from '../Notification/Notification';

import './ButtonRent.css';

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
Geocode.setLanguage('ua');
Geocode.setRegion('ua');
Geocode.setLocationType('ROOFTOP');

function ButtonRent({ setNewAppartment }) {
	const [form] = Form.useForm();
	const autocomplete = useRef();
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isError, setIsError] = useState(false);

	function toogleModal() {
		form.resetFields();
		setIsModalVisible((prev) => !prev);
	}

	function onCreate(values) {
		Geocode.fromAddress(values.address)
			.then(response => {
				const { lat, lng } = response.results[0].geometry.location;
				return { lat, lng };
			})
			.then(coordinates => {
				setNewAppartment({ ...values, coordinates, id: nanoid() });
				toogleModal();
			})
			.catch(() => setIsError(prev => !prev));
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

	function onPlaceChanged() {
		form.setFieldsValue({ address: autocomplete.current.value });
	}

	function getFile(e) {
		if (Array.isArray(e)) {
		  return e[0];
		}

	   return e && e.fileList[0];
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
								message: 'Обов\'язкове поле',
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
								message: 'Обов\'язкове поле',
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
								message: 'Обов\'язкове поле',
							},
						]}
					>
						<Autocomplete onPlaceChanged={onPlaceChanged}>
							<input ref={autocomplete} placeholder='Input address' />
						</Autocomplete>
					</Form.Item>

					<Form.Item
						name='image'
						label='Зображення'
						rules={[
							{
								required: true,
								message: 'Обов\'язкове поле',
							},
						]}
						getValueFromEvent={getFile}
					>
						<Upload multiple={false} beforeUpload={() => false} accept='.jpg,.png,.jpeg'>
							<Button icon={<UploadOutlined />}>Click to upload</Button>
						</Upload>
					</Form.Item>
				</Form>
			</Modal>
			{isError && <Notification setIsError={setIsError} />}
		</>
	);
}

export default ButtonRent;
