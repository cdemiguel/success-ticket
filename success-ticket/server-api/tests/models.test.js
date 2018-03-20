const mongoose = require('mongoose')
const assert = require('assert')
const { User, Event, Session, Ticket } = require('../src/models')


describe('models', () => {
    before(() => {
        return mongoose.connect('mongodb://localhost/success-ticket-models-test')
    })

    describe('validate ticket', () => {
        let event, session, ticket

        before(() => {
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
                company: 'company',
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
                .then(event => {
                    const sessionId = session._id.toString()
                    const ticketId = ticket._id.toString()

                    event.sessions.id(sessionId).tickets.id(ticketId).set({ status: true })

                    return event.save()
                })
                .then(_event => event = _event)
        })

        it('should validate ticket', () => {
            assert(ticket, 'should ticket been created')

            assert(session, 'should session been created')

            assert(event, 'should event be created')

            const [_session] = event.sessions

            assert.equal(_session._id.toString(), session._id.toString(), 'should session match')

            const [_ticket] = _session.tickets

            assert.equal(_ticket._id.toString(), ticket._id.toString(), 'should ticket match')

            assert(_ticket.status, 'should ticket be validated')
        })
    })

    after(done => {
        return mongoose.connection.db.dropDatabase(() => {
            mongoose.connection.close(done)
        })
    })
})