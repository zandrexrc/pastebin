import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { rootReducer, initialState } from './reducers';
import { ReduxState } from '../models/ReduxState';
// Uncomment to enable redux logging
// import { createLogger } from 'redux-logger';

// Uncomment to enable redux logging
// const loggerMiddleware = createLogger();

function configureStore(preloadedState: ReduxState | any = initialState) {
    return createStore(
        rootReducer,
        preloadedState,
        applyMiddleware(
            thunkMiddleware, 
            // Uncomment to enable redux logging
            // loggerMiddleware
        )
    );
}

export { configureStore };