import React, { Component } from 'react'
import { Redirect } from "react-router";
import './delete-user.css';
import api_client from "./../api-client";

import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/scale.css';

import UserInfo from '../conf-user-info/conf-user-info'

class DeleteUser extends Component {
    constructor() {
        super()
        this.state = {
            redirect: false,
            userInformation: "",
            usersSelectedCompany:""
        }
    }

    componentWillReceiveProps(props) {
        const companyId = props.companyId
        api_client.getUsersByCompanyId(companyId).then(_usersTodelete => {
            if (_usersTodelete) {
                const usersTodelete = _usersTodelete
                this.setState({ usersTodelete })
            }
        })
    }

    logOut = () => {
        this.setState({
            redirect: true
        })
    }
    setUserInfo = (userInformation, role, emailUser) => {
        this.setState({userInformation, role, emailUser});
      }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    
    deleteUser = () => {
        const { email, role, emailUser } = this.state
        
        api_client.deleteUser(email, role, emailUser)
        .then(user =>{
            if (user.status == "OK") {
                Alert.success(`User deleted succesfully`, {
                    position: 'bottom',
                    effect: 'scale',
                    beep: true,
                    timeout: 3000
                })

            } else {
                Alert.error(user.message, {
                    position: 'bottom',
                    effect: 'scale',
                    beep: true,
                    timeout: 3000
                });
            }
        })
    }

    render() {

        const { usersTodelete } = this.state
        
        return (
            <div>
                {(this.state.redirect) ? <Redirect to='/log-in' /> : undefined}
                <div className="delete-user-section user-section">
                    <div className="col-12 section-title">
                        <h3>HI {this.state.userInformation}!
                        <span className="float-right" onClick={this.logOut}>Log Out</span>
                        </h3>
                    </div>
                    <hr />

                    <UserInfo sendUserInfo={this.setUserInfo} />

                    <div className="col-12 section-title">
                        <h3>Administration events</h3>
                    </div>
                    <hr />
                    <div className="container pt-4">
                    <p>You can only delete VALIDATOR users in your company:</p>

                    {usersTodelete ? usersTodelete.map((user, index) => (
                        <div className="mb-2">
                            <div><span>Name: </span><span>{user.name}</span></div>
                            <div className="mb-2"><span>Email: </span><span>{user.email}</span></div>
                            <hr/>
                        </div>
                    )
                    ) : undefined}
                        <form className="mt-4" onSubmit={(e) => {
                                    e.preventDefault()
                                    this.deleteUser()
                                }}>
                            <input onChange={this.handleChange}  name="email" className="col-12 mb-4" type="text" placeholder="e.g:email@email.com" required />
                            <button>Delete</button>
                        </form>
                    </div>
                </div>
                <Alert stack={{ limit: 3 }} />
            </div>

        )
    }

}

export default DeleteUser;
