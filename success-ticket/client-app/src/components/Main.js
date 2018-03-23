import React, { Component } from "react";
import api_client from "./api-client";
import "./main.css";

// import react-router
import { Route, HashRouter } from "react-router-dom";

import Login from "./login/login";
import Menu from "./menu/menu";
import Events from "./events/events";
import Sessions from "./sessions/sessions";
import Tickets from "./validation-list/validation-list";
import UserConfiguration from "./conf-options/conf-options";
import CreateUser from "./conf-create-user/create-user";
import DeleteUser from "./conf-delete-user/delete-user";
import UpdateUser from "./conf-update-user/update-user";

class Main extends Component {
  constructor() {
    super();
    this.state = {
      companyName: "",
      companyId:"",
      eventTitle:"",
      user:"",

    };
  }

  sendCompanyName = (companyName) => {
    this.setState({ companyName });
  }

  seteventTitle = (eventTitle) => {
    this.setState({ eventTitle });
  }

  setUser = (user) => {
    this.setState({ user });
  }

  componentDidMount() {
    const userId = sessionStorage.getItem('userID')
    api_client.getCompanyIdByUser(userId).then(_companyId => {
      if(_companyId) {
        const companyId = _companyId
        this.setState({ companyId })
      }
    })



  }
  
  render() {
    return (
      <div>
        <HashRouter>
          <div>
            <Route exact path="/log-in" render={() => <Login setUser={this.setUser} />} />

            <Route path="/r" render={() => <Menu companyName={this.state.companyName} />} />

            <Route path="/r/events" render={() => <Events userInfo={this.state.user} sendCompanyName={this.sendCompanyName} sendRole={this.sendRole} />} />

            <Route
              path="/r/sessions/:title/:idEvent"
              render={routeProps => <Sessions sendeventTitle={this.seteventTitle} {...routeProps} />}
            />

            <Route
              path="/r/tickets/:idEvent/:idSession"
              render={routeProps => <Tickets eventTitle={this.state.eventTitle} {...routeProps} />}
            />

            <Route
              path="/r/user-configuration"
              render={() => <UserConfiguration companyName={this.state.companyName} userInfo={this.state.user} />}
            />

            <Route path="/r/create-user" render={() => <CreateUser 
            companyName={this.state.companyName}
            userInfo={this.state.user} 
            companyId={this.state.companyId}
            role={this.state.role}
             />} />

            <Route path="/r/update-user" render={() => <DeleteUser userInfo={this.state.user} />} />

            <Route path="/r/delete-user" render={() => <UpdateUser userInfo={this.state.user} />} />
          </div>
        </HashRouter>
      </div>
    );
  }
}

export default Main;
