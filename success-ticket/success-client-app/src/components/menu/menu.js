import React, { Component } from 'react';
import './menu.css';

class Menu extends Component {

    render() {
        return (

            <div className="container-full event-section">
                <nav className="navbar navbar-light">
                    <a className="navbar-brand" href="#">
                        <img src="/images/succes-ticket-logo.svg" width={30} height={30} className="d-inline-block align-top" alt />
                        <span className="ml-2 text-white">Company name</span>
                    </a>
                    <div className>
                        <a href>
                            <i className="icon ion-ios-person-outline" />
                        </a>
                    </div>
                </nav>
            </div>

        )
    }

}

export default Menu;