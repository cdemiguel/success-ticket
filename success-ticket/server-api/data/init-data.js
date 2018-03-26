require("dotenv").config()
const mongoose = require("mongoose")
var _ = require("lodash")
const { User, Event, Session, Ticket, Company } = require("../src/models")

const host = process.env.MONGO_HOST
const portMongo = process.env.MONGO_PORT
const database = process.env.MONGO_DB
const port = process.env.PORT

mongoose
  .connect(`mongodb://${host}:${portMongo}/${database}`)
  // .then(() => Event.remove())
  // .then(() => User.remove())
  .then(main)
  .catch(console.error)

function main() {
  const company = Company({
    name: "DemoCompany02"
  })

  company.save()

  const user = User({
    name: "Isabelda02",
    surname: "Fernandez02",
    email: "mail02@mail.com",
    role: "ADMIN",
    username: "isa21",
    password: "123"
  })

  user.save()

  const event = new Event({
    title: "Concierto Daft Punk02",
    subtitle: "Gira Mundial02",
    image:
      "https://rtvc-assets-radionica3.s3.amazonaws.com/s3fs-public/styles/image_750x422/public/senalradionica/articulo-noticia/galeriaimagen/front_dp.jpg?itok=4jq3x0B9"
  })

  const session = new Session({
    date: new Date(),
    location: "Stadium"
  })

  function addTickets() {
    for (let i = 40; i < 50; i++) {
      const code = i + "QWERTYU"
      const ticket = new Ticket({
        code,
        status: false,
        validated: undefined
      })
      session.tickets.push(ticket)
    }
  }

  addTickets()

  event.company = [company._id]
  event.sessions = [session]
  event.save()

  user.events = [event._id]
  user.companies = [company._id]
  user.save()
}
