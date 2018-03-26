const mongoose = require("mongoose")

// const { Schema, Schema: { ObjectId } } = mongoose

const Schema = mongoose.Schema

const Company = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
})

const User = new Schema({
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String
  },
  companies: [
    {
      type: Schema.Types.ObjectId,
      ref: "Company"
    }
  ],
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
  events: [
    {
      type: Schema.Types.ObjectId,
      ref: "Event"
    }
  ]
})

const Ticket = new Schema({
  code: {
    type: String,
    required: true,
    unique: true
  },
  status: Boolean,
  validated: Date
})

const Session = new Schema({
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

const Event = new Schema({
  title: {
    type: String,
    required: true
  },
  subtitle: String,
  company: {
    type: Schema.Types.ObjectId,
    ref: "Company",
    required: true
  },
  image: {
    type: String,
    required: true
  },
  sessions: [Session]
})

module.exports = {
  User: mongoose.model("User", User),
  Event: mongoose.model("Event", Event),
  Session: mongoose.model("Session", Session),
  Ticket: mongoose.model("Ticket", Ticket),
  Company: mongoose.model("Company", Company)
}
