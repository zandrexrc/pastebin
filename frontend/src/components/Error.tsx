import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.background.default,
        "& .MuiTypography-root": {
            width: '60%',
            minWidth: '280px',
            margin: '0 auto 10px auto',
        }
    }
}));

type ErrorProps = {
    status: number,
    message: string,
};

function Error({ status, message }: ErrorProps) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography variant="h1" color="primary">
                { status }
            </Typography>

            <Typography variant="h5" color="textPrimary">
                { message }
            </Typography>
        </div>
    )
}

export { Error };