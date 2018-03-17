import React, { Component } from 'react';
import { Link } from "react-router-dom"
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
                    <Link  to={`/r/create-user`}>
                    <button>Create user</button>
                    </Link>
                    
                    <p className="text-center">Upgrade or modify user information</p>
                    <Link  to={`/r/delete-user`}>
                    <button>Modify user</button>
                    </Link>
                    
                    <p className="text-center">Eliminates an user by id</p>
                    <Link  to={`/r/update-user`}>
                    <button>Delete user</button>
                    </Link>

                </div>
            </div>

        )
    }

}

export default UserConfiguration;

