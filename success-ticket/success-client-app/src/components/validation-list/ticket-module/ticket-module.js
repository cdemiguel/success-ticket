import React, { Component } from 'react';

class TicketModule extends Component {

    render() {
        return (

                <div className="container section-ticket-list">
                    <div className="row">
                        <div className="col-6">
                            <p className="text-center selected">all</p>
                        </div>
                        <div className="col-6">
                            <p className="text-center">only validated</p>
                        </div>
                    </div>
                    <div className="row section-ticket">
                        <div className="col-12">
                            <div className="section-ticket-content">
                                <span>H223NW3HUWN4</span>
                                <br />
                                <span className="small-text">20/02/2018</span>
                                <div className="section-ticket-validate success text-center">
                                    <span>validated</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row section-ticket">
                        <div className="col-12">
                            <div className="section-ticket-content">
                                <span>H223NW3HUWN4</span>
                                <br />
                                <span className="small-text" />
                                <div className="section-ticket-validate text-center">
                                    <span>validate</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

        )
    }

}

export default TicketModule;


