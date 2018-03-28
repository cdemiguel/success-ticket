const { Schema } = require('mongoose')

module.exports = new Schema({
    status: Boolean,
    validated: Date
})