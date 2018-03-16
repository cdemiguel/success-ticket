let api_client;

(function(){

    const axios = require('axios')
    const baseUrl = 'http://localhost:8080'

    api_client = {

        getEventList(){
            return axios.get(`${baseUrl}/events/5aa92e783cd32239cebd1d44`).then(res => res.data.data)
        },

        getSessionsList(eventId){
            return axios.get(`${baseUrl}/events/sessions/${eventId}`).then(res => res.data.data)
        },

        getTicketsList(eventId, sessionId){
            return axios.get(`${baseUrl}/events/sessions/tickets/${eventId}/${sessionId}`).then(res => res.data.data)
        }


    }


})()

export default api_client