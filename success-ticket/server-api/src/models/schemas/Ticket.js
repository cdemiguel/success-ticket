const { Schema } = require('mongoose')

module.exports = new Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    status: Boolean,
    validated: Date
})