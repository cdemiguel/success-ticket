const { Schema, Schema: { ObjectId } } = require('mongoose')
const Session = require('./Session')

module.exports = new Schema({
  title: {
    type: String,
    required: true
  },
  subtitle: String,
  company: {
    type: ObjectId,
    ref: "Company",
    required: true
  },
  image: {
    type: String,
    required: true
  },
  sessions: [Session]
})