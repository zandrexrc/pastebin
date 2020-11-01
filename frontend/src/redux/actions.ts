import fetch from 'cross-fetch';
import { ErrorDetails } from '../models/ErrorDetails';
import { Paste } from '../models/Paste';
import { ReduxThunk } from '../models/ReduxThunk';
import { convertToPaste } from '../utils';
import config from '../config';

export const setIsFetching = (status: boolean) => ({
    type: "SET_IS_FETCHING",
    payload: status,
});

export const setError = (errorDetails: ErrorDetails | null) => ({
    type: "SET_ERROR",
    payload: errorDetails,
});

export const setActivePaste = (paste: Paste) => ({
    type: "SET_ACTIVE_PASTE",
    payload: paste,
});

export const getPaste = (pasteUrl: string): ReduxThunk => 
    async (dispatch, getState) => {
        if (!getState().isFetching) {
            dispatch(setIsFetching(true));
            try {
                const res = await fetch(
                    `${config.backend_url}/${pasteUrl}`,
                    {
                        method: 'GET',
                        headers: {
                            'x-functions-key': config.get_paste_function_key
                        }
                    }
                );
                const payload = await res.json();

                if (payload.error) {
                    dispatch(setError(payload.error));
                } else {
                    const newPaste = convertToPaste(payload)
                    dispatch(setActivePaste(newPaste));
                    dispatch(setError(null));
                }
            }
            catch (error) {
                const errorDetails = {
                    status: 503,
                    title: "Connection error",
                    detail: "Failed to connect to the server",
                    type: "/errors/network-error",
                    instance: `${config.frontend_url}/${pasteUrl}`
                };
                dispatch(setError(errorDetails));
            } finally {
                dispatch(setIsFetching(false));
            }
        }
    }

export const postPaste = (paste: Paste, callback: (pasteUrl: string) => void): ReduxThunk => 
    async (dispatch, getState) => {
        if (!getState().isFetching) {
            dispatch(setIsFetching(true));
            try {
                const res = await fetch(
                    `${config.backend_url}`,
                    {
                        method: 'POST',
                        headers: { 
                            'Content-Type': 'application/json',
                            'x-functions-key': config.post_paste_function_key
                        },
                        body: JSON.stringify(paste)
                    }
                );
                const payload = await res.json();

                if (payload.error) {
                    dispatch(setError(payload.error));
                } else {
                    const newPaste = convertToPaste(payload)
                    dispatch(setActivePaste(newPaste));
                    dispatch(setError(null));
                    callback(payload.pasteUrl);
                }
            }
            catch (error) {
                const errorDetails = {
                    status: 503,
                    title: "Connection error",
                    detail: "Failed to connect to the server",
                    type: "/errors/network-error",
                    instance: `${config.frontend_url}`
                };
                dispatch(setError(errorDetails));
            } finally {
                dispatch(setIsFetching(false));
            }
        }
    }