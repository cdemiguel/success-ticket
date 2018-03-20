import React, { Component } from "react"
import api_client from "./../api-client"
import QrReader from 'react-qr-reader'

class ValidationCamera extends Component {
    constructor(props){
        super(props)
        this.state = {
          delay: 3000,
          result: 'focus your ticket on the camera',
        }
        this.handleScan = this.handleScan.bind(this)
      }

      handleScan(data){
        if(data){

          const idEvent = this.props.event
          const idSession = this.props.session
          const idTicket = data

          api_client.validateTicket(idEvent, idSession, idTicket).then(status=>{

            this.props.setStatus(status)
            
            if(status.data){
              this.props.setSelectedTicket(status.data)
            }

            })

          this.setState({
            result: data,
          })
        }
      }

      handleError(err){
        console.error(err)
      }

      render(){
        return(

          <div className="container">
          <div className="row">
            <div className="col-12">
            <QrReader
              delay={this.state.delay}
              onError={this.handleError}
              onScan={this.handleScan}
              style={{ width: '100%' }}
              />
            <p className="text-center pt-2">{this.state.result}</p>
                </div>
            </div>
          </div>
        )
      }
}

export default ValidationCamera;
