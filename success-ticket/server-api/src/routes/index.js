const logic = require("../logic")
const express = require("express")
const eventRoute = express.Router()
const bodyParser = require("body-parser")

const passport = require("passport")
const LocalStrategy = require("passport-local")
const jwt = require("jsonwebtoken")
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt")

const jsonBodyParser = bodyParser.json()
const secret = process.env.JWT_SECRET

passport.use(
  new LocalStrategy((username, password, done) => {
    logic
      .checkLogin(username, password)
      .then(user => {
        if (!user) return done(undefined, Error('username and/or password wrong'))

        done(undefined, user)
      })
      .catch(err => done(undefined, err))
  })
)

passport.use(new JwtStrategy({
  secretOrKey: secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}, (payload, done) => {
  const { id, email } = payload

  logic.getUserByUserId(id)
      .then(user => done(undefined, user ? user : false))
      .catch(done)
}))



/* check login  */
eventRoute.post("/login",
  [jsonBodyParser, passport.authenticate("local", { session: false })],
  (req, res) => {
    if (req.user instanceof Error)
      return res.json({
        status: 'KO',
        error: req.user.message
      })

    const { user: { _id, email } } = req
    const token = jwt.sign(
      {
        id: _id.toString(),
        email
      },
      secret
    )
    res.json({
      status: "OK",
      data: {
        token
      }
    })
  })

/* get company name */
eventRoute.route("/company").get(passport.authenticate('jwt', { session: false }), (req, res) => {
  const { user } = req

  logic
    .getCompanyByUser(user._id)
    .then(company => {
      res.json({
        status: "OK",
        message: "company from this user recieved succesfuly",
        data: company
      })
    })
    .catch(err => {
      res.json({
        status: "KO",
        message: err.message
      })
    })
})

/* get companyid by userid  */
eventRoute.route("/companyid/:userId").get((req, res) => {
  const { params: { userId } } = req
  logic
    .getCompanyIdByUser(userId)
    .then(company => {
      res.json({
        status: "OK",
        message: "company from this user recieved succesfuly",
        data: company
      })
    })
    .catch(err => {
      res.json({
        status: "KO",
        message: err.message
      })
    })
})

/* get user info by id */
eventRoute.route("/user/:userId").get((req, res) => {
  const { params: { userId } } = req
  logic
    .getUserByUserId(userId)
    .then(user => {
      res.json({
        status: "OK",
        message: "user from this user recieved succesfuly",
        data: user
      })
    })
    .catch(err => {
      res.json({
        status: "KO",
        message: err.message
      })
    })
})

/* get events */
eventRoute.route("/").get(passport.authenticate('jwt', { session: false }), (req, res) => {
  const { user } = req
  logic
    .getEventsByUserId(user._id)
    .then(events => {
      res.json({
        status: "OK",
        message: "events from this user recieved succesfuly",
        data: events
      })
    })
    .catch(err => {
      res.json({
        status: "KO",
        message: err.message
      })
    })
})

/* get events by companyID */
eventRoute.route("/companyid/events/:companyId").get((req, res) => {
  const { params: { companyId } } = req
  logic
    .getEventListByCompanyId(companyId)
    .then(events => {
      res.json({
        status: "OK",
        message: "events from this company recieved succesfuly",
        data: events
      })
    })
    .catch(err => {
      res.json({
        status: "KO",
        message: err.message
      })
    })
})

/* get sessions */
eventRoute.route("/sessions/:eventId").get((req, res) => {
  const { params: { eventId } } = req
  logic
    .getSessions(eventId)
    .then(sessions => {
      res.json({
        status: "OK",
        message: "sessions from this user recieved succesfuly",
        data: sessions
      })
    })
    .catch(err => {
      res.json({
        status: "KO",
        message: err.message
      })
    })
})

/* get tickets */
eventRoute.route("/sessions/tickets/:eventId/:sessionId").get((req, res) => {
  const { params: { eventId, sessionId } } = req
  logic
    .getTickets(eventId, sessionId)
    .then(tickets => {
      res.json({
        status: "OK",
        message: "tickets from this user recieved succesfuly",
        data: tickets
      })
    })
    .catch(err => {
      res.json({
        status: "KO",
        message: err.message
      })
    })
})

/* find ticket */
eventRoute
  .route("/sessions/ticket/:eventId/:sessionId/:ticketId")
  .get((req, res) => {
    const { params: { eventId, sessionId, ticketId } } = req
    logic
      .findTicket(eventId, sessionId, ticketId)
      .then(tickets => {
        res.json({
          status: "OK",
          message: "ticket from this user recieved succesfuly",
          data: tickets
        })
      })
      .catch(err => {
        res.json({
          status: "KO",
          message: err.message
        })
      })
  })

/* update ticket */
eventRoute
  .route("/sessions/validate-ticket/:eventId/:sessionId/:ticketId")
  .put((req, res) => {
    const { params: { eventId, sessionId, ticketId } } = req
    logic
      .updateTicket(eventId, sessionId, ticketId)
      .then(tickets => {
        res.json({
          status: "OK",
          message: "ticket validated successfully",
          data: tickets
        })
      })
      .catch(err => {
        res.json({
          status: "KO",
          message: err.message
        })
      })
  })

/* create user */
eventRoute.route("/usercreate").post(jsonBodyParser, (req, res) => {
  const {
    body: { name, username, email, password, rol, companyId, eventsId }
  } = req
  logic
    .createUser(name, username, email, password, rol, companyId, eventsId)
    .then(name => {
      res.json({
        status: "OK",
        message: "user created successfully",
        data: name
      })
    })
    .catch(err => {
      res.json({
        status: "KO",
        message: err.message
      })
    })
})

/* get all users by company id */
eventRoute.route("/user/company/:companyId").get((req, res) => {
  const { params: { companyId } } = req
  logic
    .getCompanyByUsers(companyId)
    .then(users => {
      res.json({
        status: "OK",
        message: "users from this company retrieved OK",
        data: users
      })
    })
    .catch(err => {
      res.json({
        status: "KO",
        message: err.message
      })
    })
})

eventRoute
  .route("/user/delete/:userEmail")
  .delete(jsonBodyParser, (req, res) => {
    const { params: { userEmail } } = req
    const { body: { role, emailUser } } = req
    logic
      .deleteUser(userEmail, role, emailUser)
      .then(data => {
        res.json({
          status: "OK",
          message: "user deleted successfully",
          data: data
        })
      })
      .catch(err => {
        res.json({
          status: "KO",
          message: err.message
        })
      })
  })

module.exports = eventRoute
