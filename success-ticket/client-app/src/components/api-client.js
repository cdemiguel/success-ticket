import api_client from 'client-api';

api_client.protocol = process.env.REACT_APP_PROTOCOL
api_client.host = process.env.REACT_APP_HOST
api_client.port = process.env.REACT_APP_PORT

export default api_client;