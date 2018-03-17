const mongoose = require('mongoose')

const Schema = mongoose.Schema

const User = new Schema({
    name: String,
    surname: String,
    company:String,
    email: String,
    role: String,
    username: String,
    password: String,
    events: [{type: Schema.ObjectId, ref: 'Event'}]
})

const Ticket = new mongoose.Schema({
    code: String,
    status: Boolean,
    validated: Date
})

const Session = new mongoose.Schema({
    date: Date,
    location: String,
    tickets: [Ticket] 
})

const Event = new mongoose.Schema({
    title: String,
    subtitle: String,
    company: String,
    image: String,
    sessions: [Session]
})

module.exports = {
    User: mongoose.model('User', User),
    Event: mongoose.model('Event', Event),
    Session: mongoose.model('Session', Session),
    Ticket: mongoose.model('Ticket', Ticket),
}