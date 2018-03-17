const dataEvents = require('./data_events')

const logicEvents = {

    getAllEvents() {
        return new Promise((resolve, reject) => {
            Event.find({})
                .then(resolve)
                .catch(reject)
        })
    }

}

module.exports = logicEvents