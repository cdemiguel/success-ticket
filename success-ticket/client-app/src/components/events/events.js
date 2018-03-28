import React, { Component } from "react"
import "./events.css"
import api_client from "./../api-client"
import { withRouter, Link } from "react-router-dom"

class Events extends Component {
  constructor() {
    super()
    this.state = {
      events: [],
      companyName: "",
      role: ""
    }
  }

  componentDidMount() {
    const token = sessionStorage.getItem("token")

    api_client.getEventList(token).then(events => {
      this.setState({ events })
    })

    api_client.getCompanyName(token).then(companyNameSelected => {
      if (companyNameSelected) {
        const companyName = companyNameSelected
        this.setState({ companyName })
        this.props.sendCompanyName(this.state.companyName)
      }
    })

    const companyName = this.state.companyName
  }

  render() {
    const { events } = this.state
    const eventsList = events ? (events[0] ? events[0].events : null) : null

    return (
      <div>
        <div className="col-12 section-title">
          <h3>
            Events list
            <span />
          </h3>
        </div>
        <hr />

        {events &&
          eventsList &&
          eventsList.map((event, index) => (
            <div key={index}>
              <Link to={`/r/sessions/${event.title}/${event._id}`}>
                <div className="container event-section">
                  <div className="row">
                    <div className="col-12 no-gutters">
                      <img className="img-fluid" src={event.image} alt />
                    </div>
                    <div className="col-12 event-section-title pt-3 position-absolute">
                      <h2 className="text-left">
                        <strong>{event.title}</strong>
                      </h2>
                      <p className="text-left">{event.subtitle}</p>
                      <a href>
                        <i className="icon ion-android-arrow-forward" />
                      </a>
                    </div>
                  </div>
                </div>
              </Link>
              <hr />
            </div>
          ))}
      </div>
    )
  }
}

export default withRouter(Events)
