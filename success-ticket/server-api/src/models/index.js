const mongoose = require("mongoose")
const { User, Event, Session, Ticket, Company } = require('./schemas')

module.exports = {
  User: mongoose.model("User", User),
  Event: mongoose.model("Event", Event),
  Session: mongoose.model("Session", Session),
  Ticket: mongoose.model("Ticket", Ticket),
  Company: mongoose.model("Company", Company)
}
