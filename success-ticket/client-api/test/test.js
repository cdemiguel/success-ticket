require('dotenv').config();

const api_client = require('../index')
const assert = require('assert')
const expect = require('chai').expect

const { API_PROTOCOL, API_HOST, API_PORT } = process.env;

api_client.protocol = API_PROTOCOL;
api_client.host = API_HOST;
api_client.port = API_PORT;

describe('Testing API client', () => {

    const email = 'mail02@mail.com'
	const password = '123'
    const userID = '5ab987cc54f2aaf2e220ebd6'
    const companyId = '5ab13447031c9c2fa3193b97'
    const eventId = '5ab13447031c9c2fa3193b99'
    const sessionId = '5ab13447031c9c2fa3193b9a'
    const ticketId = '5ab13447031c9c2fa3193b9b'

    const nameUser = 'Demiguel_test123456'
    const usernameUser = 'username_test123456'
    const emailUser = 'test@tes.com123456'
    const passwordUser = '123456'
    const rolAdmin = 'admin'
    const rolUser = 'validator'
    const eventsId = ['5ab13447031c9c2fa3193b99']
    const companysId = ['5ab13447031c9c2fa3193b97']

    it('should login an user', done => {
        api_client.loginUser(email, password)
            .then(res => {
                assert.equal(res.status, 'OK', 'results should be OK')
                assert(res.data._id, 'should return data id')
                done()
            })
            .catch(done)
    })

    it('retrieve a company NAME by User id', done => {
        api_client.getCompanyName(userID)
            .then(res => {
                expect(res).to.be.equal('DemoCompany02')
                done()
            })
            .catch(done)
    })

    it('retrieve a company ID by User id', done => {
        api_client.getCompanyIdByUser(userID)
            .then(res => {
                expect(res).to.be.equal('5ab987cc54f2aaf2e220ebd5')
                done()
            })
            .catch(done)
    })

    it('retrieve events by a company id', done => {
        api_client.getEventListByCompanyId(companyId)
            .then(res => {
                expect(res).to.have.length.above(0)
                expect(res).to.be.an('array')
                done()
            })
            .catch(done)
    })

    it('retrieve sessions by company id and event id', done => {
        api_client.getSessionsList(eventId)
            .then(res => {
                expect(res).to.have.length.above(0)
                expect(res[0].company).to.be.equal('5ab13447031c9c2fa3193b97')
                expect(res[0].sessions).to.have.length.above(0)
                expect(res[0].sessions).to.be.an('array')
                expect(res[0].sessions[0]).to.have.all.keys('_id', 'date', 'location');
                done()
            })
            .catch(done)
    })

    it('retrieve ticket selected from eventId, sessionId, ticketId', done => {
        api_client.getTicket(eventId, sessionId, ticketId)
            .then(res => {
                assert.equal(res.status, 'OK', 'results should be OK')
                expect(res.data._id).to.be.equal('5ab13447031c9c2fa3193b9b')
                done()
            })
            .catch(done)
    })

    it('will create an user inside the company', done => {
        api_client.createUser(nameUser, usernameUser, emailUser, passwordUser, rolUser, companysId, eventsId)
        .then (res => {
            assert.equal(res.status, 'OK', 'results should be OK')
            expect(res.data).to.be.equal(nameUser)
            done()
        })
        .catch(done)
    })

    it('will delete an Validator user', done => {
        api_client.deleteUser(emailUser, rolAdmin, email)
        .then (res => {
            assert.equal(res.status, 'OK', 'results should be OK')
            done()
        })
        .catch(done)
    })
    

})