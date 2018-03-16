import React, { Component } from "react";
import api_client from "./../api-client";
import "./validation-list.css";

import TicketModule from "./ticket-module/ticket-module";
import NotificationMsg from "../notification-msg/notification-msg";

class Tickets extends Component {
  constructor() {
    super();
    this.state = {
      tickets: []
    };
  }

  componentDidMount() {
    this.showTickets(
      this.props.match.params.idEvent,
      this.props.match.params.idSession
    );
  }

  showTickets = (idEvent, idSession) => {
    api_client.getTicketsList(idEvent, idSession).then(tickets => {
      this.setState({ tickets });
    });
  };

  render() {
    const { tickets } = this.state;
    const ticketsList = tickets
      ? tickets[0] ? tickets[0].tickets : null
      : null;

    const ticketsLocation = tickets.map(ticket => ticket.location);
    const ticketsDate = tickets.map(ticket => ticket.date);

    return (
      <div>
        <div>
          <div className="col-12 section-title">
            <h3>Validation process</h3>
            <span>32/200 tickets validated</span>
          </div>
          <hr />
          <div className="col-12 section-tickets-title">
            <h3>DEMARCO FLAMENCO</h3>
            <span>
              <strong>{ticketsDate}</strong>
            </span>
            <span> | </span>
            <span>{ticketsLocation}</span>
          </div>
          <hr />
          <div className="container">
            <div className="row section-ticket-searcher">
              <div className="col-12">
                <input placeholder="eg. 123FJBY54..." type="text" />
              </div>
              <div className="col-12 pt-4">
                <p className="text-center">
                  <a>Validate with camera</a>
                </p>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row section-ticket-list">
              <div className="col-6">
                <p className="text-center selected">all</p>
              </div>
              <div className="col-6">
                <p className="text-center">only validated</p>
              </div>
            </div>
          </div>
          {tickets &&
            ticketsList &&
            ticketsList.map((ticket, index) => <TicketModule key={index} />)}

          <NotificationMsg />
        </div>
      </div>
    );
  }
}

export default Tickets;
