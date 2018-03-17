const logicEvents = require('./logic_events')
const express = require('express')
const eventRoute = express.Router()

eventRoute.route('/:userid')

    .get((req, res) => {

        const { params: { userid } } = req

        logicEvents.getAllEvents(companyid)
            .then(events => {
                res.json({
                    status: "OK",
                    message: "events recieved succesfully",
                    data: events
                })
            })
            .catch(err => {
                res.json({
                    status: "KO",
                    message: err.message
                })
            })

    })

module.exports = eventRoute