import React, { Component } from 'react';
import './update-user.css';

class UpdateUser extends Component {

    render() {
        return (

            <div className="update-user-section">
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
                        <input className="col-12 mb-4" type="text" placeholder="e.g:surname" required />
                        <input className="col-12 mb-4" type="text" placeholder="e.g:email@email.com" required />
                        <input className="col-12 mb-4" type="password" placeholder="e.g:password" required />
                        <input className="col-12 mb-4" type="text" placeholder="e.g:NEW! username" required />
                        <input className="col-12 mb-4" type="text" placeholder="e.g:NEW! email" required />
                        <input className="col-12 mb-4" type="password" placeholder="e.g:NEW! password" required />
                        <button>Update</button>
                    </form>
                </div>
            </div>

        )
    }

}

export default UpdateUser;

