import React, { Component } from 'react'
import './create-user.css'
import { Redirect } from "react-router";
import api_client from "./../api-client";

import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/scale.css';

import UserInfo from '../conf-user-info/conf-user-info'

class CreateUser extends Component {
    constructor() {
        super()
        this.state = {
            redirect: false,
            userInformation: "",

            name: "",
            email: "",
            username: "",
            password: "",
            rol: "",

            userRol: "",

            events: "",
            eventsToPass: [],
            companyId: ""

        }
    }

    componentWillMount(props) {
        const userId = sessionStorage.getItem('userID')
        api_client.getCompanyIdByUser(userId).then(_companyId => {
            if (_companyId) {
                const companyId = _companyId
                this.setState({ companyId })
                return api_client.getEventListByCompanyId(companyId).then(events => {
                    this.setState({ events });
                    if(this.state.role == "ADMIN" || this.state.role == "admin") {
                        const { events } = this.state
                        this.setState({eventsToPass: events})
                    }
                })
            }
        })



    }

    logOut = () => {
        this.setState({
            redirect: true
        })
    }

    setUserInfo = (userInformation, role) => {
        this.setState({ userInformation });
        this.setState({ role });
    }

    handleOptionChange = (changeEvent) => {
        this.setState({
            rol: changeEvent.target.value
        })
        if(changeEvent.target.value == "admin" || changeEvent.target.value == "ADMIN"){
            const { events } = this.state
            this.setState({eventsToPass: events})
        }else {
            this.setState({eventsToPass: []})
        }
    }


    handleOptionChangeCheckbox = (event) => {
        let eventsId = [...this.state.eventsToPass];
        const value = event.target.value
        const index = eventsId.findIndex(day => day === value);
        if (index > -1) {
            eventsId = [...eventsId.slice(0, index), ...eventsId.slice(index + 1)]
        } else {
            eventsId.push(value);
        }
        this.setState({ eventsToPass: eventsId })
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    createUser = (e) => {
        const { name, username, email, password, rol } = this.state
        const companyId = this.state.companyId
        const eventsId = this.state.eventsToPass
        api_client.createUser(name, username, email, password, rol, companyId, eventsId).then(user => {
            if (user.status == "OK") {
                Alert.success(`${user.data} has been created successfully`, {
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

        const { userInfo, companyName } = this.props
        const { events, role, rol } = this.state
        const eventsList = events ? events : null;

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

                    <UserInfo sendUserInfo={this.setUserInfo} />

                    {(role && role.toLowerCase() === "admin") ?
                        <div>
                            <div className="col-12 section-title">
                                <h3>Administration events</h3>
                            </div>
                            <hr />
                            <div className="container create-user-section pt-4">
                                <form onSubmit={(e) => {
                                    e.preventDefault()
                                    this.createUser()
                                }}>
                                    <input className="col-12 mb-4" type="text" name="name" placeholder="e.g: Name"
                                        onChange={this.handleChange} required />
                                    <input className="col-12 mb-4" type="text" name="username" placeholder="e.g: Username"
                                        onChange={this.handleChange} required />
                                    <input className="col-12 mb-4" type="text" name="email" placeholder="e.g: email@email.com"
                                        onChange={this.handleChange} required />
                                    <input className="col-12 mb-4" type="password" name="password" placeholder="e.g: ********"
                                        onChange={this.handleChange} required />

                                    <div class="row">
                                        <div className="radio col-6">
                                            <label>
                                                <input type="radio" value="admin"
                                                    checked={this.state.rol === 'admin'}
                                                    onChange={this.handleOptionChange} />
                                                Admin
                                        </label>
                                        </div>
                                        <div className="radio col-6">
                                            <label>
                                                <input type="radio" value="validator"
                                                    checked={this.state.rol === 'validator'}
                                                    onChange={this.handleOptionChange} />
                                                Validator
                                        </label>
                                        </div>
                                    </div>

                                    {(rol && rol.toLowerCase() === "validator") ?
                                        <div>
                                            <p>Select the events that wants to new user could validate:</p>
                                            <div className="row mb-2">
                                                {eventsList ? eventsList.map((event, index) => (
                                                    <div key={index} className="checkbopx col-12">
                                                        <label>
                                                            <input type="checkbox" className="mr-2"
                                                                onChange={this.handleOptionChangeCheckbox}
                                                                value={event._id} />
                                                            {event.title}
                                                        </label>
                                                    </div>
                                                )
                                                ) : undefined}
                                            </div>
                                        </div>
                                        : null}
                                    <button>Create</button>
                                </form>
                            </div>
                        </div>
                        : null}
                </div>
                <Alert stack={{ limit: 3 }} />
            </div>

        )
    }

}

export default CreateUser;

