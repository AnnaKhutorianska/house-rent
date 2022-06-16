import React from 'react';
import { Button, Modal } from 'antd';
import { useState } from 'react';

import './ButtonRent.css';

function ButtonRent() {
	const [isModalVisible, setIsModalVisible] = useState(false);

	function showModal() {
		setIsModalVisible(true);
	};

	function handleOk() {
		setIsModalVisible(false);
	};

	function handleCancel() {
		setIsModalVisible(false);
	};

	return (
		<>
			<Button
				onClick={showModal}
				className='button-rent'
			>
				Здати в оренду &#x271A;
			</Button>
			<Modal
				title='Додати оголошення'
				visible={isModalVisible}
				onOk={handleOk}
				onCancel={handleCancel}
			>
				<p>Some contents...</p>
				<p>Some contents...</p>
				<p>Some contents...</p>
			</Modal>
		</>
	);
}

export default ButtonRent;
