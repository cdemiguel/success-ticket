require('dotenv').config()
const mongoose = require('mongoose')
var _ = require('lodash');
const { User, Event, Session, Ticket } = require('../src/models')

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
    name: 'Isabelda01',
    surname: 'Fernandez01',
    company:'TikTakTickets!',
    email: 'mail01@mail.com',
    role: 'ADMIN',
    username: 'isa01',
    password: '123',
})

user.save()

const event = new Event({
    title: 'Concierto Daft Punk01',
    subtitle: 'Gira Mundial01',
    company: 'Daft Punk Company01',
    image: 'https://rtvc-assets-radionica3.s3.amazonaws.com/s3fs-public/styles/image_750x422/public/senalradionica/articulo-noticia/galeriaimagen/front_dp.jpg?itok=4jq3x0B9',
})

const session = new Session({
    date: new Date,
    location: 'Stadium'
})

function addTickets(){

    for(let i=20;i<30;i++){
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