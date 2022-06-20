import React from 'react';
import { Alert } from 'antd';

import './Notification.css';

function Notification({ setIsError }) {
    function onClose() {
        setIsError(false);
    }

    return (
        <Alert
            showIcon
            message='Невірний адрес'
            description='Перевірте коректність введених даних'
            type='error'
            closable
            onClose={onClose}
            className='notification'
        />
    )
}

export default Notification;
