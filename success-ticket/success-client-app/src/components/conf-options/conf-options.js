import React, { Component } from 'react';
import './conf-options.css';
import UserInfo from '../conf-user-info/conf-user-info'

class UserConfiguration extends Component {

    render() {
        return (

            <div className="container-full user-section">
                <div className="col-12 section-title">
                    <h3>HI MATEO!
                    <span className="float-right">Log Out</span>
                    </h3>
                </div>
                <hr />

                <UserInfo/>

                <div className="col-12 section-title">
                    <h3>Administration events</h3>
                </div>
                <hr />
                <div className="container user-actions">
                    <p className="text-center">Create user for this company</p>
                    <button>Create user</button>
                    <p className="text-center">Upgrade or modify user information</p>
                    <button>Modify user</button>
                    <p className="text-center">Eliminates an user by id</p>
                    <button>Delete user</button>
                </div>
            </div>

        )
    }

}

export default UserConfiguration;

