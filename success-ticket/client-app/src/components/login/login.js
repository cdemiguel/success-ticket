import React, { Component } from "react"
import api_client from "./../api-client"
import { Redirect } from "react-router"

import Alert from "react-s-alert"
import "react-s-alert/dist/s-alert-default.css"
import "react-s-alert/dist/s-alert-css-effects/scale.css"

import "./login.css"

class Login extends Component {
  constructor() {
    super()
    this.state = {
      redirect: false,
      email: "",
      password: ""
    }
  }

  keepInputEmail = email => this.setState({ email })
  keepInputPassword = password => this.setState({ password })

  submitUser = () => {
    // const { email, password } = this.state
    // const email = this.state.email

    api_client.loginUser(this.state.email, this.state.password).then(data => {
      if (data.status == "KO") {
        Alert.error(data.error, {
          position: "bottom",
          effect: "scale",
          beep: true,
          timeout: 3000
        })
      } else {
        if (data) {
          this.props.setUser(data.data.token)

          sessionStorage.setItem("token", data.data.token)
        }
        this.setState({
          redirect: true
        })
      }
    })
  }

  render() {
    return (
      <div>
        {this.state.redirect ? <Redirect to="/r/events" /> : undefined}
        <div className="container log-in-section">
          <div className="log-in-section-title row">
            <div className="col-12 text-center">
              <img
                src="images/succes-ticket-logo.svg"
                alt="succes-ticket-logo"
              />
            </div>
            <div className="col-12 text-center">
              <h1 className="mt-4">success ticket</h1>
            </div>
          </div>
          <div className="log-in-section-form row">
            <form
              onSubmit={e => {
                e.preventDefault()
                this.submitUser()
              }}
            >
              <input
                onChange={e => this.keepInputEmail(e.target.value)}
                value={this.state.email}
                className="col-12 mb-4"
                type="text"
                placeholder="e.g:email@email.com"
                required
              />
              <input
                onChange={e => this.keepInputPassword(e.target.value)}
                value={this.state.password}
                className="col-12 mb-4"
                type="password"
                placeholder="e.g:********"
                required
              />
              <input
                className="col-12 mb-4 button"
                type="submit"
                defaultValue="Sign in"
              />
            </form>
          </div>
          {/* <div className="row text-center log-in-section-recovery">
                    <div className="col-12">
                        <a href="#">forgot your password?</a>
                    </div>
                </div> */}
          <Alert stack={{ limit: 3 }} />
        </div>
      </div>
    )
  }
}

export default Login
