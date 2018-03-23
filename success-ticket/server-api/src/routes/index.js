const logic = require('../logic')
const express = require('express')
const eventRoute = express.Router()
const bodyParser = require('body-parser')



const jsonBodyParser = bodyParser.json()

/* check login  */
eventRoute.route('/login')
    .post(jsonBodyParser, (req, res) => {
        const { body: { email, password } } = req
        logic.checkLogin(email, password)
            .then(user => {
                res.json({
                    status: "OK",
                    message: "email recieved",
                    data: user
                })
            })
            .catch(err => {
                res.json({
                    status: "KO",
                    message: err.message
                })
            })
    })

/* get company name */
eventRoute.route('/company/:userId')
    .get((req, res) => {
        const { params: { userId } } = req
        logic.getCompanyByUser(userId)
            .then(company => {
                res.json({
                    status: "OK",
                    message: "company from this user recieved succesfuly",
                    data: company
                })
            })
            .catch(err => {
                res.json({
                    status: "KO",
                    message: err.message
                })
            })
    })

/* get companyid by userid  */
eventRoute.route('/companyid/:userId')
    .get((req, res) => {
        const { params: { userId } } = req
        logic.getCompanyIdByUser(userId)
            .then(company => {
                res.json({
                    status: "OK",
                    message: "company from this user recieved succesfuly",
                    data: company
                })
            })
            .catch(err => {
                res.json({
                    status: "KO",
                    message: err.message
                })
            })
    })



/* get user info by id */
eventRoute.route('/user/:userId')
    .get((req, res) => {
        const { params: { userId } } = req
        logic.getUserByUserId(userId)
            .then(user => {
                res.json({
                    status: "OK",
                    message: "user from this user recieved succesfuly",
                    data: user
                })
            })
            .catch(err => {
                res.json({
                    status: "KO",
                    message: err.message
                })
            })
    })

/* get events */
eventRoute.route('/:userId')
    .get((req, res) => {
        const { params: { userId } } = req
        logic.getEventsByUserId(userId)
            .then(events => {
                res.json({
                    status: "OK",
                    message: "events from this user recieved succesfuly",
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

/* get events by companyID */
eventRoute.route('/companyid/events/:companyId')
    .get((req, res) => {
        const { params: { companyId } } = req
        logic.getEventListByCompanyId(companyId)
            .then(events => {
                res.json({
                    status: "OK",
                    message: "events from this company recieved succesfuly",
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
    .get((req, res) => {
        const { params: { eventId } } = req
        logic.getSessions(eventId)
            .then(sessions => {
                res.json({
                    status: "OK",
                    message: "sessions from this user recieved succesfuly",
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
    .get((req, res) => {
        const { params: { eventId, sessionId } } = req
        logic.getTickets(eventId, sessionId)
            .then(tickets => {
                res.json({
                    status: "OK",
                    message: "tickets from this user recieved succesfuly",
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
    .get((req, res) => {
        const { params: { eventId, sessionId, ticketId } } = req
        logic.findTicket(eventId, sessionId, ticketId)
            .then(tickets => {
                res.json({
                    status: "OK",
                    message: "ticket from this user recieved succesfuly",
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
    .put((req, res) => {
        const { params: { eventId, sessionId, ticketId } } = req
        logic.updateTicket(eventId, sessionId, ticketId)
            .then(tickets => {
                res.json({
                    status: "OK",
                    message: "ticket validated successfully",
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

/* create user */
eventRoute.route('/usercreate')
    .post(jsonBodyParser, (req, res) => {
        const { body: { name, username, email, password, rol, companyId, eventsId } } = req
        logic.createUser(name, username, email, password, rol, companyId, eventsId)
            .then(name => {
                res.json({
                    status: "OK",
                    message: "user created successfully",
                    data: name
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