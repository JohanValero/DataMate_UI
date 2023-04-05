import { combineReducers } from 'redux';
import {
        LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT,
        FETCH_SCHEMAS_START, FETCH_SCHEMAS_SUCCESS, FETCH_SCHEMAS_ERROR
    } from './actions';

const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    error: null,
    schemas: []
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return { ...state, user: action.payload, error: null }
        case LOGIN_ERROR:
            return { ...state, error: action.payload }
        case LOGOUT:
            localStorage.removeItem('user')
            return { ...state, user: null, error: null}
        case FETCH_SCHEMAS_START:
            return { ...state, schemas: [], error: null}
        case FETCH_SCHEMAS_ERROR:
            return { ...state, error: action.payload}
        case FETCH_SCHEMAS_SUCCESS:
            return { ...state, schemas: action.payload, error: null}
        default:
            return state
    }
}

const rootReducer = combineReducers({
    user_data: authReducer,
})

export default rootReducer