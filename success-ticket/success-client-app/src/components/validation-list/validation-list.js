import React, { Component } from 'react';
import './validation-list.css';

import TicketModule from './ticket-module/ticket-module'
import NotificationMsg from '../notification-msg/notification-msg'

class Tickets extends Component {

    render() {
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
                            <strong>20 de abril de 2018, 21:30</strong>
                        </span>
                        <span> | </span>
                        <span>La Farga, Hospitalet de Llobregat</span>
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

                    <TicketModule />

                    <NotificationMsg />

                </div>
            </div>

        )
    }

}

export default Tickets;


