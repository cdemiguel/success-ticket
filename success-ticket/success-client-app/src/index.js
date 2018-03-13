import React from 'react';
import ReactDOM from 'react-dom';

import SuccesTicketApp from './SuccesTicketApp';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<SuccesTicketApp />, document.getElementById('root'));
registerServiceWorker();
