import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { Redirect } from "react-router"
import './conf-options.css'
import UserInfo from '../conf-user-info/conf-user-info'

class UserConfiguration extends Component {
    constructor() {
        super()
        this.state = {
            redirect: false,
            userInformation: "",
            role:""
        }
    }

    logOut = () => {
        this.setState({
            redirect: true,
        })
    }

    setUserInfo = (userInformation, role) => {
        this.setState({userInformation})
        this.setState({role})
      }

    render() {

        const { userInfo, companyName } = this.props
        const { role } = this.state

        return (
            <div>
            {(this.state.redirect) ? <Redirect to='/log-in' /> : undefined}
            <div className="container-full user-section">
                <div className="col-12 section-title">
                    <h3>HI {this.state.userInformation}!
                    <span className="float-right" onClick={this.logOut}>Log Out</span>
                    </h3>
                </div>
                <hr />

                <UserInfo userInfo={userInfo} companyName={companyName} sendUserInfo={this.setUserInfo} />

                { role.toLocaleLowerCase() == "admin" ?
                <div>
                <div className="col-12 section-title">
                    <h3>Administration events</h3>
                </div>
                <hr />

     
                <div className="container user-actions">
                    <p className="text-center">Create user for this company</p>
                    <Link  to={`/r/create-user`}>
                    <button>Create user</button>
                    </Link>
                    
                    <p className="text-center">Eliminates an user by id</p>
                    <Link  to={`/r/delete-user`}>
                    <button>Delete user</button>
                    </Link>
                    
                    <p className="text-center">Upgrade or modify user information</p>
                    <Link  to={`/r/update-user`}>
                    <button>Modify user</button>
                    </Link>
                </div>
                </div>
                :null
                }

            </div>
            </div>
        )
    }

}

export default UserConfiguration;

