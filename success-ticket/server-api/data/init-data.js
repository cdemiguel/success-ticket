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
    name: "FCB"
  })

  company.save()

  const user = User({
    name: "AdminFCB",
    surname: "Barça",
    email: "fcb@fcb.com",
    role: "ADMIN",
    username: "fcb",
    password: "123"
  })

  user.save()

  const event = new Event({
    title: "FCB vs Real Madrid",
    subtitle: "Liga BBVA",
    image:"http://www.mundodeportivo.com/r/GODO/MD/p3/Barca/Imagenes/2016/12/03/Recortada/img_pmorata_20160405-125540_imagenes_md_propias_pmorata_pepm7193-kN7H-U412372788189ym-980x554@MundoDeportivo-Web.jpg"
  })

  const session = new Session({
    date: new Date(),
    location: "Camp Nou L5"
  })

  function addTickets() {
    for (let i = 0; i < 20; i++) {
      const ticket = new Ticket({
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
