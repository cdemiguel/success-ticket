import React, { Component } from 'react';
import './sessions.css';

class Sessions extends Component {

    render() {
        return (

            <div>
                <div className="col-12 section-title">
                    <h3>Events title</h3>
                </div>
                <hr />
                <div className="col-12 section-title">
                    <h3>Session list
                    <span>- 12 active sessions</span>
                    </h3>
                </div>
                <hr />
                <div className="container session-section">
                    <div className="row">
                        <div className="col-12 text-center session-subsection">
                            <div className="session-subsection-info">
                                <h3>
                                    <strong>20</strong> de abril de 2018 </h3>
                                <h3>
                                    <strong>21:30</strong> | La Farga, Hospitalet de Llobregat </h3>
                                <span className="medium">
                                    <span>25</span>/
                                    <span>200</span> validated tickets</span>
                            </div>
                            <button>Validate tickets in this section</button>
                        </div>
                    </div>
                </div>
            </div>

        )
    }

}

export default Sessions;