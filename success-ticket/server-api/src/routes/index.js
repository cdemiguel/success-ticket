const logic = require('../logic')
const express = require('express')
const eventRoute = express.Router()

/* get events */
eventRoute.route('/:userId')
    .get((req, res)=>{
        const { params: { userId } } = req
        logic.getEventsByUserId(userId)
        .then(events=>{
            res.json({
                status:"OK",
                message:"events from this user recieved succesfuly",
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

/* get sessions */
eventRoute.route('/sessions/:eventId')
    .get((req, res)=>{
    const { params: { eventId } } = req
    logic.getSessions(eventId)   
    .then(sessions=>{
        res.json({
            status:"OK",
            message:"sessions from this user recieved succesfuly",
            data: sessions
        })
    })
    .catch(err => {
        res.json({
            status: "KO",
            message: err.message
        })
    }) 
})

/* get tickets */
eventRoute.route('/sessions/tickets/:eventId/:sessionId')
    .get((req, res)=>{
    const { params: { eventId, sessionId } } = req
    logic.getTickets(eventId ,sessionId)   
    .then(tickets=>{
        res.json({
            status:"OK",
            message:"tickets from this user recieved succesfuly",
            data: tickets
        })
    })
    .catch(err => {
        res.json({
            status: "KO",
            message: err.message
        })
    }) 
})

/* find ticket */
eventRoute.route('/sessions/ticket/:eventId/:sessionId/:ticketId')
    .get((req, res)=>{
        const { params: { eventId, sessionId, ticketId } } = req
        logic.findTicket(eventId, sessionId, ticketId)
        .then(tickets=>{
            res.json({
                status:"OK",
                message:"ticket from this user recieved succesfuly",
                data: tickets
            })
        })
        .catch(err => {
            res.json({
                status: "KO",
                message: err.message
            })
        }) 
    })

/* update ticket */
eventRoute.route('/sessions/validate-ticket/:eventId/:sessionId/:ticketId')
    .put((req, res)=>{
        const { params: { eventId, sessionId, ticketId } } = req
        logic.updateTicket(eventId, sessionId, ticketId)
        .then(tickets=>{
            res.json({
                status:"OK",
                message:"ticket validated successfully",
                data: tickets
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