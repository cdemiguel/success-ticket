const { User, Event, Session, Ticket } = require('../models')
var { ObjectId } = require('mongodb');
const logic = {

    getEventsByUserId(userId) {
        return new Promise((resolve, reject) => {
            User.find({ _id: userId })
                .then(user => {
                    Event.populate(user, { path: 'events', select:'company image subtitle title' })
                        .then(resolve)
                })
                .catch(reject)
        })
    },

    getSessions(_id) {
        return new Promise((resolve, reject) => {
            Event.find({_id}).select({ "_id": 1, "company":1, "title":1, "subtitle":1, "sessions.date":1, "sessions.location":1, "sessions._id":1 })
                .then(resolve)
                .catch(reject)
        })
    },

    getTickets(eventId ,sessionId) {
        return new Promise((resolve, reject) => {
            Event.find({_id: eventId})
                .then(event => {
                    const selectedSession = event[0].sessions.filter(session=>{
                        return session.id==sessionId
                    })
                    selectedSession[0].tickets = selectedSession[0].tickets.slice(0,9)
                    return resolve(selectedSession)
                })
                .catch(reject)
        })
    },
    
    findTicket(ticketId) {
        return new Promise((resolve, reject) => {
            Event.find({_id:ticketId})
                .then(resolve)
                .catch(reject)
        })
    }

    // validateTicket(idTicket) {
    //     return new Promise((resolve, reject) => {
    //         Ticket.find({_id: idTicket})
    //             .then(ticket => {
    //                 return Ticket.updateOne({ _id: idTicket }, { code, validated, status: true })
    //             })
    //             .catch(reject)
    //     })
    // },

}

module.exports = logic