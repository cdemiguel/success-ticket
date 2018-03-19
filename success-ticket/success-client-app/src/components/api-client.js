let api_client;

(function(){

    const axios = require('axios')
    const baseUrl = 'http://192.168.0.15:8080'

    api_client = {

        getEventList(){
            return axios.get(`${baseUrl}/events/5aad09fad5ff43cfb1a7e61d`).then(res => res.data.data)
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