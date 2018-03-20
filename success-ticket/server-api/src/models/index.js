const mongoose = require('mongoose')

const Schema = mongoose.Schema

const User = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    events: [{ type: Schema.ObjectId, ref: 'Event' }]
})

const Ticket = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    status: Boolean,
    validated: String
})

const Session = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    tickets: [Ticket]
})

const Event = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    subtitle: String,
    company: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    sessions: [Session]
})

module.exports = {
    User: mongoose.model('User', User),
    Event: mongoose.model('Event', Event),
    Session: mongoose.model('Session', Session),
    Ticket: mongoose.model('Ticket', Ticket),
}