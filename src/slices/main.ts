import authReducer from './auth/auth';
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
    auth: authReducer,
});

export default rootReducer;