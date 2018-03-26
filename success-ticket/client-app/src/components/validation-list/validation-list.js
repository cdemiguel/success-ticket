import React, { Component } from "react"
import api_client from "./../api-client"

import Alert from "react-s-alert"
import "react-s-alert/dist/s-alert-default.css"
import "react-s-alert/dist/s-alert-css-effects/scale.css"

import "./validation-list.css"

import TicketModule from "../ticket-module/ticket-module"
import NotificationMsg from "../notification-msg/notification-msg"
import ValidationCamera from "../validation-camera/validation-camera"

const moment = require("moment")

class Tickets extends Component {
  constructor() {
    super()
    this.state = {
      tickets: [],
      isToggleOn: true,
      query: "",
      selectedTicket: "",
      status: ""
    }
  }

  componentDidMount() {
    this.showTickets(
      this.props.match.params.idEvent,
      this.props.match.params.idSession
    )
  }

  showTickets = (idEvent, idSession) => {
    api_client.getTicketsList(idEvent, idSession).then(tickets => {
      this.setState({ tickets })
    })
  }

  toggleValidationForm = () => {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }))
  }

  keepInput = query => this.setState({ query })

  submit = () => {
    const idEvent = this.props.match.params.idEvent
    const idSession = this.props.match.params.idSession
    const idTicket = this.state.query

    api_client.getTicket(idEvent, idSession, idTicket).then(selectedTicket => {
      if (selectedTicket.status === "OK") {
        const _status = selectedTicket.data.status
        this.setState({ status: _status })

        selectedTicket = selectedTicket.data
        this.setState({ selectedTicket })
      } else {
        Alert.error("The ticket was not found", {
          position: "bottom",
          effect: "scale",
          beep: true,
          timeout: 3000
        })
      }
    })

    this.setState({ query: "" })
  }

  setStatus = status => {
    if (status.status == "OK") {
      Alert.success("Your ticket has been succesfully validated", {
        position: "bottom",
        effect: "scale",
        beep: true,
        timeout: 3000
      })
      this.setState({ status })
    } else {
      Alert.error("Your ticket has been already validated", {
        position: "bottom",
        effect: "scale",
        beep: true,
        timeout: 3000
      })
    }
  }

  setSelectedTicket = selectedTicket => {
    this.setState({ selectedTicket })
  }

  render() {
    const { tickets } = this.state
    const { sessions } = this.state.tickets

    const isToggleOn = this.state.isToggleOn

    const { selectedTicket } = this.state

    return (
      <div className="section-validate-tickets">
        <div className="section-validate-tickets">
          <div className="col-12 section-title">
            <h3>Validation process</h3>
          </div>
          <hr />
          {sessions && sessions.length ? (
            <div className="col-12 section-tickets-title">
              <h3>{tickets.title}</h3>
              <span>
                <strong>
                  {moment(sessions[0].date).format("MMMM Do YYYY, h:mm:ss a")}
                </strong>
              </span>
              <span> | </span>
              <span>{sessions[0].location}</span>
            </div>
          ) : null}
          <hr />
          <div className="container">
            <div className="row section-ticket-searcher">
              <div className="col-12 pb-4">
                <p className="text-center">
                  <a onClick={this.toggleValidationForm}>
                    {this.state.isToggleOn
                      ? "Validate with camera"
                      : "Validate with form"}
                  </a>
                </p>
              </div>

              {isToggleOn ? (
                <form
                  onSubmit={e => {
                    e.preventDefault()
                    this.submit()
                  }}
                >
                  <div className="col-12">
                    <input
                      placeholder="eg. 123FJBY54..."
                      type="text"
                      onChange={e => this.keepInput(e.target.value)}
                      value={this.state.query}
                      required
                    />
                    <button className="mt-3" type="submit">
                      Search ticket
                    </button>
                  </div>
                </form>
              ) : (
                <ValidationCamera
                  event={this.props.match.params.idEvent}
                  session={this.props.match.params.idSession}
                  setStatus={this.setStatus}
                  setSelectedTicket={this.setSelectedTicket}
                />
              )}
            </div>
          </div>

          {selectedTicket ? (
            <TicketModule
              ticket={this.state.selectedTicket}
              event={this.props.match.params.idEvent}
              session={this.props.match.params.idSession}
              status={this.state.status}
              setStatus={this.setStatus}
              setSelectedTicket={this.setSelectedTicket}
            />
          ) : null}
        </div>
        <Alert stack={{ limit: 3 }} />
      </div>
    )
  }
}

export default Tickets
