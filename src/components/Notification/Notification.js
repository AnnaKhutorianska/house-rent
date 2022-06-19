import React from 'react';
import { Alert } from 'antd';

function Notification({ error }) {
    const onClose = (e) => {
        console.log(e, 'I was closed.');
    };

    return (
        <Alert
            showIcon
            message="Error Text"
            description={error}
            type="error"
            closable
            onClose={onClose}
            style={{textAlign: 'right', direction: 'rtl' , position: 'fixed', width:'100%', zIndex:'1000'}}
        />
    )
}

export default Notification;
