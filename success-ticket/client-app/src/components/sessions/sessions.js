import React, { Component } from "react"
import api_client from "./../api-client"
import "./sessions.css"
import { withRouter, Link } from "react-router-dom"

class Sessions extends Component {
  constructor() {
    super();
    this.state = {
      sessions: [],
      idSessions: "",
      title: ""
    }
  }

  componentDidMount() {
    this.showSessions(
      this.props.match.params.idEvent,
      this.props.match.params.title,
    )
  }

  showSessions = (idSessions, title) => {
    api_client.getSessionsList(idSessions).then(sessions => {
      this.setState({ sessions })
      this.setState({ idSessions })
      this.setState({ title })

      this.props.sendeventTitle(this.state.title)

      
    });
  };

  render() {
    const { sessions } = this.state
    const sessionsList = sessions
      ? sessions[0] ? sessions[0].sessions : null
      : null

    let sessionsNumber = this.state.sessions
    sessionsNumber = sessionsNumber.map(sessionsNumber=>sessionsNumber.sessions)
    let counter = 0
    let number = []
    sessionsNumber.forEach(function(element) {
      number.push(element.length)
    });
    number =number.toString() 

    let idEvent = this.state.sessions
    idEvent = idEvent.map(eventNumber => eventNumber._id).join("")


    return (
      <div>
        <div className="col-12 section-title">
          <h3>{this.state.title}</h3>
        </div>
        <hr />
        <div className="col-12 section-title">
          <h3>
            Session list
            <span> - {number} active sessions</span>
          </h3>
        </div>
        <hr />

        {sessions &&
          sessionsList &&
          sessionsList.map((session, index) => (
            <div className="container session-section">
              <div className="row">
                <div className="col-12 text-center session-subsection">
                  <div className="session-subsection-info">
                    <h3>{session.date}</h3>
                    <h3 className="mt-2">{session.location}</h3>
                  </div>

                  <Link to={`/r/tickets/${idEvent}/${session._id}`}>
                    <button>Validate tickets in this section</button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
    );
  }
}

export default withRouter(Sessions);
