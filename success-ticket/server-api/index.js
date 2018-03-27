require("dotenv").config()

const host = process.env.MONGO_HOST
const portMongo = process.env.MONGO_PORT
const database = process.env.MONGO_DB
const port = process.env.PORT

const eventRoute = require("./src/routes")
const passport = require("passport")

const express = require("express")
const app = express()

const cors = require("cors")
app.use(cors())

app.use(passport.initialize())

const mongoose = require("mongoose")

app.use("/events", eventRoute)

mongoose.Promise = global.Promise
mongoose.connect(`mongodb://${host}:${portMongo}/${database}`)
app.listen(port, () => console.log(`server running at ${port}`))
