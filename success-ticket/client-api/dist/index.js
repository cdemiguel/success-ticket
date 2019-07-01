var axios = require("axios");

var api_client = {
  baseUrl: function baseUrl() {
    return this.protocol + "://" + this.host + ":" + this.port;
  },
  loginUser: function loginUser(username, password) {
    return axios.post(this.baseUrl() + "/events/login", { username: username, password: password }).then(function (res) {
      return res.data;
    });
  },
  getCompanyName: function getCompanyName(token) {
    return axios.get(this.baseUrl() + "/events/company", { headers: { Authorization: "Bearer " + token } }).then(function (res) {
      return res.data.data;
    });
  },
  getCompanyIdByUser: function getCompanyIdByUser(token) {
    return axios.get(this.baseUrl() + "/events/companyid", { headers: { Authorization: "Bearer " + token } }).then(function (res) {
      return res.data.data;
    });
  },
  getEventListByCompanyId: function getEventListByCompanyId(companyId) {
    return axios.get(this.baseUrl() + "/events/companyid/events/" + companyId).then(function (res) {
      return res.data.data;
    });
  },
  getUserById: function getUserById(token) {
    return axios.get(this.baseUrl() + "/events/user", { headers: { Authorization: "Bearer " + token } }).then(function (res) {
      return res.data.data;
    });
  },
  getEventList: function getEventList(token) {
    return axios.get(this.baseUrl() + "/events", { headers: { Authorization: "Bearer " + token } }).then(function (res) {
      return res.data.data;
    });
  },
  getSessionsList: function getSessionsList(eventId) {
    return axios.get(this.baseUrl() + "/events/sessions/" + eventId).then(function (res) {
      return res.data.data;
    });
  },
  getTicketsList: function getTicketsList(eventId, sessionId) {
    return axios.get(this.baseUrl() + "/events/sessions/tickets/" + eventId + "/" + sessionId).then(function (res) {
      return res.data.data;
    });
  },
  getTicket: function getTicket(eventId, sessionId, ticketId) {
    return axios.get(this.baseUrl() + "/events/sessions/ticket/" + eventId + "/" + sessionId + "/" + ticketId).then(function (res) {
      return res.data;
    });
  },
  validateTicket: function validateTicket(eventId, sessionId, ticketId) {
    return axios.put(this.baseUrl() + "/events/sessions/validate-ticket/" + eventId + "/" + sessionId + "/" + ticketId).then(function (res) {
      return res.data;
    });
  },
  createUser: function createUser(name, username, email, password, rol, companyId, eventsId) {
    return axios.post(this.baseUrl() + "/events/usercreate", {
      name: name,
      username: username,
      email: email,
      password: password,
      rol: rol,
      companyId: companyId,
      eventsId: eventsId
    }).then(function (res) {
      return res.data;
    });
  },
  getUsersByCompanyId: function getUsersByCompanyId(companyId) {
    return axios.get(this.baseUrl() + "/events/user/company/" + companyId).then(function (res) {
      return res.data.data;
    });
  },
  deleteUser: function deleteUser(email, role, emailUser) {
    return axios.delete(this.baseUrl() + "/events/user/delete/" + email, {
      data: { role: role, emailUser: emailUser }
    }).then(function (res) {
      return res.data;
    });
  }
};

module.exports = api_client;
