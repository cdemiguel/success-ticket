const { User, Event, Session, Ticket, Company } = require('../models')
var { ObjectId } = require('mongodb');

const logic = {

    checkLogin(email, password) {
        return new Promise((resolve, reject) => {
            User.findOne({ email })
                .then(user => {
                    if (!user) {
                        throw Error('Email does not exist')
                    }
                    if (user.password != password) {
                        throw Error('username / password is wrong')
                    }
                    return User.findOne(user, { password: 0 })
                })
                .then(resolve)
                .catch(reject)
        })
    },

    getCompanyByUser(userId) {
        return new Promise((resolve, reject) => {
            User.find({ _id: userId }).select({ "companies": 1 })
                .then(user => {
                    Company.populate(user, { path: 'companies', select: 'name' })
                        .then((data) => data[0].companies[0].name)
                        .then(resolve)
                })
                .catch(reject)
        })
    },

    getCompanyIdByUser(userId) {
        return new Promise((resolve, reject) => {
            User.find({ _id: userId }).select({ "companies": 1 })
                .then(user => {
                    Company.populate(user, { path: 'companies', select: '_id' })
                        .then((data) => data[0].companies[0]._id)
                        .then(resolve)
                })
                .catch(reject)
        })
    },

    getUserByUserId(userId) {
        return User.findOne({ _id: userId }).select({ "name": 1, "username": 1, "email": 1, "role": 1 })
    },

    getEventsByUserId(userId) {
        return new Promise((resolve, reject) => {
            User.find({ _id: userId }).select({ "events": 1 })
                .then(user => {
                    Event.populate(user, { path: 'events', select: 'company image subtitle title' })
                        .then(resolve)
                })
                .catch(reject)
        })
    },

    getEventListByCompanyId(companyId) {
        return new Promise((resolve, reject) => {
            Event.find({ company: companyId }).select({ "title": 1, "_id":1 })
                .then(resolve)
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
        return new Promise((resolve, reject) => {
        Event.findOne({ _id: eventId }).select({ "title": 1, "sessions.date": 1, "sessions.location": 1})
            .then(resolve)
            .catch(reject)
        }) 
    },

    findTicket(eventId, sessionId, ticketId) {
        return Event.findOne({ _id: eventId })
            .then(event => {
                if (!event.sessions.id(sessionId).tickets.id(ticketId)) {
                    throw Error('Ticket does not exist')
                }
                return event.sessions.id(sessionId).tickets.id(ticketId)
            })
    },

    updateTicket(eventId, sessionId, ticketId) {
        return Event.findOne({ _id: eventId })
            .then(event => {
                if (event.sessions.id(sessionId).tickets.id(ticketId).status == true) {
                    throw Error('Ticket already validated')
                }
                event.sessions.id(sessionId).tickets.id(ticketId).set({ status: true, validated: Date.now() })
                return event.save()
            })
            .then(event => event.sessions.id(sessionId).tickets.id(ticketId))
    },

    createUser(name, username, email, password, role, companyId, eventsId) {
        return new Promise((resolve, reject) => {
            return User.findOne({ username })
                .then(user => {
                    if (user) throw Error('Username already exists')
                    return User.create({ name, username, email, password, role })
                })
                .then(() => {
                    return User.findOneAndUpdate({ username },
                        {
                            "$push": {
                                companies: { _id:companyId },
                                events: { "$each": eventsId}
                            }
                        }, 
                        {
                            new: true
                        }
                    )
                })
                .then(user=>user.name)
                .then(resolve)
                .catch(reject)
        })
    },

    getCompanyByUser(companyId) {
        return new Promise((resolve, reject) => {
            return User.find({ companies: companyId, role:"validator" }).select({ "_id": 1, "name":1, "email":1})
                .then(resolve)
                .catch(reject)
        })
    }



}


module.exports = logic
