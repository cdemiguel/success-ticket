import React, { Component } from 'react';
import './create-user.css';
import UserInfo from '../conf-user-info/conf-user-info'

class CreateUser extends Component {

    render() {
        return (

            <div className="container-full user-section">
                <div className="col-12 section-title">
                    <h3>HI MATEO!
                    <span className="float-right">Log Out</span>
                    </h3>
                </div>
                <hr />

                <UserInfo />

                <div>
                    <div className="col-12 section-title">
                        <h3>Administration events</h3>
                    </div>
                    <hr />
                    <div className="container create-user-section pt-4">
                        <form action>
                            <input className="col-12 mb-4" type="text" placeholder="e.g:username" required />
                            <input className="col-12 mb-4" type="text" placeholder="e.g:surname" required />
                            <input className="col-12 mb-4" type="text" placeholder="e.g:email@email.com" required />
                            <input className="col-12 mb-4" type="password" placeholder="e.g:********" required />
                            <input className type="radio" defaultValue="admin" />
                            <label htmlFor="contactChoice1">Admin</label>
                            <input type="radio" defaultValue="validator" />
                            <label htmlFor="contactChoice1">Validator</label>
                            <button>Create</button>
                        </form>
                    </div>
                </div>
            </div>

        )
    }

}

export default CreateUser;

