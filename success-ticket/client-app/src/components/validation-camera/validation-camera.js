import React, { Component } from "react"
import api_client from "./../api-client"
import QrReader from "react-qr-reader"

import Alert from "react-s-alert"
import "react-s-alert/dist/s-alert-default.css"
import "react-s-alert/dist/s-alert-css-effects/scale.css"

class ValidationCamera extends Component {
  constructor(props) {
    super(props)
    this.state = {
      delay: 3000,
      result: "Focus your ticket on the camera"
    }
    this.handleScan = this.handleScan.bind(this)
  }

  handleScan(data) {
    if (data) {
      const idEvent = this.props.event
      const idSession = this.props.session
      const idTicket = data

      api_client.validateTicket(idEvent, idSession, idTicket).then(status => {
        if (status.status === "OK") {
          this.props.setStatus(status)
          if (status.data) {
            this.props.setSelectedTicket(status.data)
          }
        } else {
          Alert.error("The ticket was not found", {
            position: "bottom",
            effect: "scale",
            beep: true,
            timeout: 3000
          })
        }
      })

      this.setState({
        result: data
      })
    }
  }

  handleError(err) {
    console.error(err)
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <QrReader
              delay={this.state.delay}
              onError={this.handleError}
              onScan={this.handleScan}
              style={{ width: "100%" }}
            />
            <p className="text-center pt-2">{this.state.result}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default ValidationCamera
