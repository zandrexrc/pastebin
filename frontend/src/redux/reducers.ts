import { combineReducers } from 'redux';
import { ErrorDetails } from '../models/ErrorDetails';
import { Paste } from '../models/Paste';
import { ReduxAction } from '../models/ReduxAction';
import { ReduxState } from '../models/ReduxState';

export const isFetching = (state: boolean = false, action: ReduxAction) => {
    return action.type === "SET_IS_FETCHING" ? action.payload : state;
};

export const error = (state: ErrorDetails | null = null, action: ReduxAction) => {
    return action.type === "SET_ERROR" ? action.payload : state;
};

export const activePaste = (state: Paste | null = null, action: ReduxAction) => {
    return action.type === "SET_ACTIVE_PASTE" ? action.payload : state;
};

export const rootReducer = combineReducers({
    isFetching,
    error,
    activePaste
});

export const initialState: ReduxState = {
    isFetching: false,
    error: null,
    activePaste: null,
};