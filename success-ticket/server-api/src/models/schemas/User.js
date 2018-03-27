const { Schema, Schema: { ObjectId } } = require('mongoose')

module.exports = new Schema({
    name: {
      type: String,
      required: true
    },
    surname: {
      type: String
    },
    companies: [
      {
        type: ObjectId,
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
        type: ObjectId,
        ref: "Event"
      }
    ]
  })