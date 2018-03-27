const { Schema } = require('mongoose')
const Ticket = require('./Ticket')

module.exports = new Schema({
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