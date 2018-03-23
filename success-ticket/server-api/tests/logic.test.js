const mongoose = require('mongoose')
const assert = require('assert')
const { User, Event, Session, Ticket, Company } = require('../src/models')
const logic = require('../src/logic')

describe('logic', () => {
    before(() => {
        return mongoose.connect('mongodb://localhost/success-ticket-logic-test')
    })

    beforeEach(() => {
        return Promise.all([
            User.remove(),
            Event.remove(),
            Company.remove()
        ])
    })

    describe('validate ticket', () => {
        let company, event, session, ticket

        before(() => {
            company = new Company({
                name: 'name'
            })
            
            ticket = new Ticket({
                code: '123'
            })

            session = new Session({
                date: new Date,
                location: 'roc boronat 35',
                tickets: [ticket]
            })

            event = new Event({
                title: 'title',
                company: company._id,
                image: 'image',
                sessions: [session]
            })

            return Promise.all([
                event.save().then(_event => event = _event),
            ])
                .then(() => {
                    const id = event._id.toString()

                    return Event.findOne({_id: id})
                })
                .then(_event => event = _event)
                .then(() => logic.updateTicket(event._id.toString(), session._id.toString(), ticket._id.toString()))
                .then(_ticket => ticket = _ticket)
        })

        it('should validate ticket', () => {
            assert(ticket, 'should ticket been created')

            assert(session, 'should session been created')

            assert(event, 'should event be created')

            const [_session] = event.sessions

            assert.equal(_session._id.toString(), session._id.toString(), 'should session match')

            const [_ticket] = _session.tickets

            assert.equal(_ticket._id.toString(), ticket._id.toString(), 'should ticket match')

            assert(ticket.status, 'should ticket be validated')
        })
    })

    after(done => {
        return mongoose.connection.db.dropDatabase(() => {
            mongoose.connection.close(done)
        })
    })
})