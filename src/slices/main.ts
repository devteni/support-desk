import authReducer from './auth/auth';
import ticketReducer from './tickets/ticket';

import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
    auth: authReducer,
    ticket: ticketReducer,
});

export default rootReducer;