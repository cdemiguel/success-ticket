const { User, Event, Session, Ticket } = require('../models')
var { ObjectId } = require('mongodb');
const logic = {

    getEventsByUserId(userId) {
        return new Promise((resolve, reject) => {
            User.find({ _id: userId })
                .then(user => {
                    Event.populate(user, { path: 'events', select: 'company image subtitle title' })
                        .then(resolve)
                })
                .catch(reject)
        })
    },

    getSessions(_id) {
        return new Promise((resolve, reject) => {
            Event.find({ _id }).select({ "_id": 1, "company": 1, "title": 1, "subtitle": 1, "sessions.date": 1, "sessions.location": 1, "sessions._id": 1 })
                .then(resolve)
                .catch(reject)
        })
    },

    getTickets(eventId, sessionId) {
        return Event.findOne({ _id: eventId })
            .then(event => {
                return event.sessions.id(sessionId)
            })
    },

    findTicket(eventId, sessionId, ticketId) {
        return Event.findOne({ _id: eventId })
            .then(event => {
                if(!event.sessions.id(sessionId).tickets.id(ticketId)) {
                    throw Error('Ticket does not exist')
                }
                return event.sessions.id(sessionId).tickets.id(ticketId)
            })
    },

    updateTicket(eventId, sessionId, ticketId) {
        return Event.findOne({ _id: eventId })
            .then(event => {
                if(event.sessions.id(sessionId).tickets.id(ticketId).status == true) {
                    throw Error('Ticket already validated')
                }
                date = new Date()
                event.sessions.id(sessionId).tickets.id(ticketId).set({ status: true, validated: `${date.getFullYear()}-${(date.getMonth()+1)}-${date.getDate()} | ${date.getHours()}:${date.getMinutes()}`  })
                return event.save()
            }).then(ticket=>{
                return ticket.sessions.id(sessionId).tickets.id(ticketId)
            })
    }


}

module.exports = logic