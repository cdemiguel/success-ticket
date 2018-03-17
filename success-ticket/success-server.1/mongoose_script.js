require('dotenv').config()
const mongoose = require('mongoose')
var _ = require('lodash');
const { User, Event, Session, Ticket } = require('./src/models')

const host = process.env.MONGO_HOST
const portMongo = process.env.MONGO_PORT
const database = process.env.MONGO_DB
const port = process.env.PORT

mongoose.connect(`mongodb://${host}:${portMongo}/${database}`)
    // .then(() => Event.remove())
    // .then(() => User.remove())
    .then(main)
    .catch(console.error)

function main() {

const user = User({
    name: 'Isabelda',
    surname: 'Fernandez',
    company:'TikTakTickets!',
    email: 'mail@mail.com',
    role: 'ADMIN',
    username: 'isa',
    password: '123',
})

user.save()

const event = new Event({
    title: 'Concierto Daft Punk',
    subtitle: 'Gira Mundial',
    company: 'Daft Punk Company',
    image: 'http://image.com',
})

const session = new Session({
    date: new Date,
    location: 'Stadium'
})

function addTickets(){

    for(let i=0;i<10000;i++){
        const code = i +'QWERTYU'
        const ticket = new Ticket({
            code,
            status: false,
            validated: undefined
        })
        session.tickets.push(ticket)    
    }
    
}

addTickets()

event.sessions = [session]

event.save()

user.events = [event._id]

user.save()

}