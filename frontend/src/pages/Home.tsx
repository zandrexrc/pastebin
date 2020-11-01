import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Link, Typography } from '@material-ui/core';
import { Header } from '../components/Header';
import { PasteForm } from '../components/PasteForm';
import { Error } from '../components/Error';
import { ReduxState } from '../models/ReduxState';

const useStyles = makeStyles(theme => ({
    root: {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.background.default,
        "& .MuiTypography-root": {
            width: '60%',
            minWidth: '280px',
            margin: '0 auto 10px auto',
        },
        "& .MuiTypography-body2": {
            lineHeight: 1.5,
            marginBottom: '2em',
        }
    }
}));

function Home() {
    const classes = useStyles();
    const error = useSelector((state: ReduxState) => state.error);

    return (
        <div className={classes.root}>
            <Header />
            {
                !error && 
                <div>
                    <Typography variant="h6" color="primary">
                        # Disclaimer
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                        This site is intended for use as a short-term exchange 
                        of pasted information between parties. All submitted 
                        data is considered public information. As such, please 
                        refrain from submitting personal or sensitive data. 
                        Submitted data is not guaranteed to be permanent, 
                        and may be removed at any time. 
                        <br /><br />
                        Please do not set up programs to send data to this site 
                        in an automated fashion; it is intended to be used 
                        directly by humans.
                        <br /><br />
                        Should you reasonably believe that any third-party 
                        content you access through this site is in breach of 
                        any law, regulation or third party’s rights, you should 
                        notify the site owner at&nbsp; 
                        <Link href="mailto:zandrexrc@gmail.com">
                            zandrexrc@gmail.com
                        </Link>.
                    </Typography>
                    <Typography variant="h6" color="primary">
                        # Create new paste
                    </Typography>
                    <PasteForm />
                </div>
            }
            {
                error && 
                <Error status={error.status} message={error.title} />
            }
        </div>
    )
}

export { Home };