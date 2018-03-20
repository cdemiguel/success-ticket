let api_client;

(function(){

    const axios = require('axios')
    const baseUrl = 'http://localhost:8080'

    api_client = {

        getEventList(){
            return axios.get(`${baseUrl}/events/5aad09fad5ff43cfb1a7e61d`).then(res => res.data.data)
        },

        getSessionsList(eventId){
            return axios.get(`${baseUrl}/events/sessions/${eventId}`).then(res => res.data.data)
        },

        getTicketsList(eventId, sessionId){
            return axios.get(`${baseUrl}/events/sessions/tickets/${eventId}/${sessionId}`).then(res => res.data.data)
        },

        getTicket(eventId, sessionId, ticketId){
            return axios.get(`${baseUrl}/events/sessions/ticket/${eventId}/${sessionId}/${ticketId}`).then(res => res.data)
        },

        validateTicket(eventId, sessionId, ticketId){
            return axios.put(`${baseUrl}/events/sessions/validate-ticket/${eventId}/${sessionId}/${ticketId}`).then(res => res.data)
        }


    }


})()

export default api_client