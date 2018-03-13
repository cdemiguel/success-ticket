
import React, { Component } from 'react';

class UserInfo extends Component {

    render() {
        return (

            <div className="col-12 user-info-section">
                <p>
                    <span>username: </span>
                    <span>Mateo</span>
                </p>
                <p>
                    <span>email: </span>
                    <span>Mateo@xtremetickets.com</span>
                </p>
                <p>
                    <span>company name:</span>
                    <span>xtreme tickets</span>
                </p>
                <p>
                    <span>user type:</span>
                    <span>admin</span>
                </p>
            </div>

        )
    }

}

export default UserInfo;




