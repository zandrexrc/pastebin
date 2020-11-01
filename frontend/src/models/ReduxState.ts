import { ErrorDetails } from './ErrorDetails';
import { Paste } from './Paste';

export type ReduxState = {
    isFetching: boolean,
    error?: ErrorDetails | null,
    activePaste?: Paste | null,
};