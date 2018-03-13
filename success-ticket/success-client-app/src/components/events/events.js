import React, { Component } from 'react';
import './events.css';

class Events extends Component {

    render() {
        return (
            <div>
                <div className="col-12 section-title">
                    <h3>Events list
                        <span>-ordered by date-</span>
                    </h3>
                </div>
                <hr />
                <div>
                    <div className="container event-section">
                        <div className="row">
                            <div className="col-12 no-gutters">
                                <img className="img-fluid" src="/images/01_event.jpg" alt />
                            </div>
                            <div className="col-12 event-section-title pt-3 position-absolute">
                                <h2 className="text-left">
                                    <strong>EVENT NAME</strong>
                                </h2>
                                <p className="text-left">Subtitle event name</p>
                                <a href>
                                    <i className="icon ion-android-arrow-forward" />
                                </a>
                            </div>
                        </div>
                    </div>
                    <hr />
                </div>
            </div>

        )
    }

}

export default Events;


