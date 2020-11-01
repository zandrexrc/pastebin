import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core/';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPaste } from '../redux/actions';
import { ReduxState } from '../models/ReduxState';
import { Header } from '../components/Header';
import { PasteDetails } from '../components/PasteDetails';
import { Error } from '../components/Error';

const useStyles = makeStyles(theme => ({
    root: {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.background.default,
        "& .loading": {
            width: '50%',
            minWidth: '280px',
            margin: '2em auto 0 auto',
        },
    },
}));

type PasteViewerRouteParams = {
    pasteUrl: string,
};

function PasteViewer() {
    const classes = useStyles();

    // Get paste url
    const routeParams: PasteViewerRouteParams = useParams();
    const pasteUrl = routeParams.pasteUrl;

    // Get state from redux store
    const error = useSelector((state: ReduxState) => state.error);
    const paste = useSelector((state: ReduxState) => state.activePaste);

    // Track fetch progress
    const [pasteIsLoaded, setPasteIsLoaded] = useState(false);
    const isFetching = useSelector((state: ReduxState) => state.isFetching);

    // Fetch paste contents
    const dispatch = useDispatch();
    useEffect(() => {
        // Only send request if selected paste is not in redux state
        if (!paste || paste.pasteUrl !== pasteUrl) {
            dispatch(getPaste(pasteUrl));
        }
        setPasteIsLoaded(true);
    }, [pasteIsLoaded, dispatch, paste, pasteUrl]);

    return (
        <div className={classes.root}>
            <Header />
            {
                pasteIsLoaded && !isFetching && paste && 
                <PasteDetails paste={paste} />
            }
            {
                pasteIsLoaded && !isFetching && error && 
                <Error status={error.status} message={error.title} />
            }
            {
                (!pasteIsLoaded || isFetching) &&
                <div className="loading">
                    <CircularProgress />
                </div>
            }
        </div>
    )
}

export { PasteViewer };