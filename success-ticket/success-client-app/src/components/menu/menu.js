import React, { Component } from "react"
import { Link } from "react-router-dom"
import "./menu.css"

class Menu extends Component {
  render() {
    return (
      <div className="container-full event-section">
        <nav className="navbar navbar-light">

          <Link  to={`/r/events`}>
          <a className="navbar-brand" href="route">
            <img
              src="/images/succes-ticket-logo.svg"
              width={30}
              height={30}
              className="d-inline-block align-top"
            />
            <span className="ml-2 text-white">Company name</span>
          </a>
          </Link>
          
          <Link  to={`/r/user-configuration`}>
          <div>
            <a href="route">
              <i className="icon ion-ios-person-outline" />
            </a>
          </div>
          </Link>
          
        </nav>
      </div>
    );
  }
}

export default Menu;
