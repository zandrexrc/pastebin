import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Paste } from '../models/Paste';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
    root: {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.background.default,
        "& .MuiTypography-root": {
            width: '60%',
            minWidth: '280px',
            margin: '0 auto 10px auto',
            overflow: 'auto',
        },
    }
}));

type PasteDetailsProps = {
    paste: Paste,
};

function PasteDetails({ paste }: PasteDetailsProps) {
    const classes = useStyles();
    
    return (
        <div className={classes.root}>
            <Typography variant="h6" color="primary">
                { paste.title }
            </Typography>

            {
                paste.ttl && paste.timestamp &&
                <div>
                    <Typography variant="body2" color="textSecondary">
                        Posted on { moment.unix(paste.timestamp).format('LL') } <br />
                        { 
                            paste.ttl > -1
                            ? `Expires ${moment.unix(paste.timestamp + paste.ttl).format('LL')}`
                            : 'No expiration date'
                        }
                    </Typography>
                </div>
            }

            <Typography variant="body1" color="textPrimary" component="pre">
                { paste.content }
            </Typography>
        </div>
    )
}

export { PasteDetails };