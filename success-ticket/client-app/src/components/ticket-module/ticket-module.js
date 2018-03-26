import React, { Component } from "react"
import api_client from "./../api-client"

const moment = require("moment")

class TicketModule extends Component {
  constructor() {
    super()
  }

  validate = () => {
    const idEvent = this.props.event
    const idSession = this.props.session
    const idTicket = this.props.ticket._id

    api_client.validateTicket(idEvent, idSession, idTicket).then(status => {
      this.props.setStatus(status)

      if (status.data) this.props.setSelectedTicket(status.data)
    })
  }

  render() {
    return (
      <div className="container">
        <div onClick={this.validate} className="row section-ticket">
          <div className="col-12">
            <div className="section-ticket-content text-center">
              <span>{this.props.ticket._id}</span>
              <br />
              <span className="small-text" />

              {this.props.status ? (
                <div>
                  <div className="section-ticket-validate text-center success">
                    <span>validated</span>
                  </div>
                  <div className="mt-2">
                    <span>
                      {moment(this.props.ticket.validated).format(
                        "MMMM Do YYYY, h:mm:ss a"
                      )}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="section-ticket-validate text-center">
                  <span>validate</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default TicketModule
