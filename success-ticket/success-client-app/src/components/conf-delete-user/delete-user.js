import React, { Component } from 'react';
import './delete-user.css';

class DeleteUser extends Component {

    render() {
        return (
            <div className="delete-user-section">
                <div className="col-12 section-title">
                    <h3>HI MATEO!
                        <span className="float-right">Log Out</span>
                    </h3>
                </div>
                <hr />
                <div className="col-12 user-info-section">
                    <p>
                        <span>username: </span>
                        <span>Mateo</span>
                    </p>
                </div>
                <div className="col-12 section-title">
                    <h3>Administration events</h3>
                </div>
                <hr />
                <div className="container pt-4">
                    <form action>
                        <input className="col-12 mb-4" type="text" placeholder="e.g:username" required />
                        <input className="col-12 mb-4" type="text" placeholder="e.g:email@email.com" required />
                        <button>Delete</button>
                    </form>
                </div>
            </div>

        )
    }

}

export default DeleteUser;
