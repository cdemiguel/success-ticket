import React, { Component } from 'react';
import './notification-msg.css';

class NotificationMsg extends Component {

    render() {
        return (

            <div className="container-full succes-validation-text">
                <div className="row">
                    <div className="col-12">
                        <p className="text-center">Your ticket has been succesfully validated</p>
                    </div>
                </div>
            </div>

        )
    }

}

export default NotificationMsg;
