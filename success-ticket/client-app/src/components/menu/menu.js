import React, { Component } from "react"
import { Link } from "react-router-dom"
import "./menu.css"
import api_client from "./../api-client"

class Menu extends Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    const userId = sessionStorage.getItem("userID")

    api_client.getCompanyName(userId).then(companyNameSelected => {
      if (companyNameSelected) {
        const companyName = companyNameSelected
        this.setState({ companyName })
      }
    })

    const companyName = this.state.companyName
  }

  render() {
    return (
      <div className="container-full event-section">
        <nav className="navbar navbar-light">
          <Link to={`/r/events`}>
            <a className="navbar-brand" href="route">
              <img
                src="/images/succes-ticket-logo.svg"
                width={30}
                height={30}
                className="d-inline-block align-top"
              />
              <span className="ml-2 text-white">{this.state.companyName}</span>
            </a>
          </Link>

          <Link to={`/r/user-configuration`}>
            <div>
              <a href="route">
                <i className="icon ion-ios-person-outline" />
              </a>
            </div>
          </Link>
        </nav>
      </div>
    )
  }
}

export default Menu
