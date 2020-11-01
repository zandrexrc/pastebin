import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { ReduxState } from './ReduxState';

export type ReduxThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    ReduxState,
    unknown,
    Action<string>
>