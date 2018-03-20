import React, { Component } from "react";
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
      eventTitle:""
    };
  }

  setCompanyName = (companyName) => {
    this.setState({ companyName });
  }

  seteventTitle = (eventTitle) => {
    this.setState({ eventTitle });
  }
  
  render() {
    return (
      <div>
        <HashRouter>
          <div>
            <Route exact path="/log-in" render={() => <Login />} />

            <Route path="/r" render={() => <Menu companyName={this.state.companyName} />} />

            <Route path="/r/events" render={() => <Events sendCompanyName={this.setCompanyName} />} />

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
              render={() => <UserConfiguration />}
            />

            <Route path="/r/create-user" render={() => <CreateUser />} />

            <Route path="/r/delete-user" render={() => <DeleteUser />} />

            <Route path="/r/update-user" render={() => <UpdateUser />} />
          </div>
        </HashRouter>
      </div>
    );
  }
}

export default Main;
