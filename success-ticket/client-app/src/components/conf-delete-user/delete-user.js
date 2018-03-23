import React, { Component } from 'react'
import { Redirect } from "react-router";
import './delete-user.css';
import UserInfo from '../conf-user-info/conf-user-info'

class DeleteUser extends Component {
    constructor() {
        super()
        this.state = {
            redirect: false,
            userInformation: ""
        }
    }

    logOut = () => {
        this.setState({
            redirect: true
        })
    }

    setUserInfo = (userInformation) => {
        this.setState({userInformation});
      }

    render() {

        const { userInfo } = this.props

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
                        <form action>
                            <input className="col-12 mb-4" type="text" placeholder="e.g:username" required />
                            <input className="col-12 mb-4" type="text" placeholder="e.g:email@email.com" required />
                            <button>Delete</button>
                        </form>
                    </div>
                </div>
            </div>

        )
    }

}

export default DeleteUser;
