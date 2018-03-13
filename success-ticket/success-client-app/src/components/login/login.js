import React, { Component } from 'react';
import './login.css';

class Login extends Component {

    render() {
        return (
            <div className="container log-in-section">
                <div className="log-in-section-title row">
                    <div className="col-12 text-center">
                        <img src="images/succes-ticket-logo.svg" alt="succes-ticket-logo" />
                    </div>
                    <div className="col-12 text-center">
                        <h1 className="mt-4">succes ticket</h1>
                    </div>
                </div>
                <div className="log-in-section-form row">
                    <input className="col-12 mb-4" type="text" placeholder="e.g:username" required />
                    <input className="col-12 mb-4" type="password" placeholder="e.g:********" required />
                    <input className="col-12 mb-4 button" type="button" defaultValue="Sign in" />
                </div>
                <div className="row text-center log-in-section-recovery">
                    <div className="col-12">
                        <a href="#">forgot your password?</a>
                    </div>
                </div>
            </div>
        )
    }
    
}

export default Login;