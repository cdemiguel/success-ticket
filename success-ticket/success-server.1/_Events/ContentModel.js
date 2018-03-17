const mongoose = require('mongoose')

const Schema = mongoose.Schema

const collection = process.env.MONGO_COL_EVENTS

const ContentSchema = new Schema({
    event: {
            companyname: String,
            title: String,
            subtitle: String,
            image: String,
            sessions: [
                {

                    location: String,
                    date: String,
                    tickets: [
                        {
                            id: String,
                            status: Boolean,
                            validation_date: Date,
                        }
                    ]
                }
            ]
        }  
})

module.exports = mongoose.model(collection, ContentSchema)