import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Toolbar, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        padding: '1.5em 0',
        diplay: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        "& .MuiTypography-root": {
            width: '60%',
            minWidth: '280px',
            margin: '0 auto 10px auto',
            paddingBottom: '0.5em',
            borderBottom: `2px solid ${theme.palette.primary.main}`,
        },
        "& .link": {
            textDecoration: 'none',
            color: theme.palette.primary.main,
        },
    }
}));

function Header() {
    const classes = useStyles();

    return (
        <Toolbar className={classes.root}>
            <Typography variant="h3" color="primary">
                <Link to="/" className="link">
                    pastebin
                </Link>
            </Typography>
        </Toolbar>
    )
}

export { Header };