import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { postPaste } from '../redux/actions';
import { makeStyles } from '@material-ui/core/styles';
import { Button, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import { Paste } from '../models/Paste';
import { validatePaste } from '../utils';

const useStyles = makeStyles(({
    root: {
        width: '100%',
        minWidth: '280px',
        diplay: 'flex',
        flexFlow: 'column nowrap',
        justifyContent: 'center',
        alignItems: 'center',
        "& .field": {
            width: '60%',
            minWidth: '280px',
            margin: '0 auto 30px auto',
            "& .MuiButton-root": {
                width: '100%',
            },
        },
        "& .displayLinebreaksAndTabs": {
            whiteSpace: 'pre-wrap',
        },
    }
}));

function PasteForm() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const [state, setState] = useState({
        pasteUrl: "",
        title: " ",
        content: " ",
        ttl: -1,
    });

    const expirationValues = [
        { label: 'None', seconds: -1 },
        { label: 'A day', seconds: 86400 },
        { label: 'A week', seconds: 604800 },
        { label: 'A month', seconds: 2592000 },
        { label: 'A year', seconds: 31556926 }
    ];
    
    const submit = () => {
        // POST form data only if it is valid
        const newPaste: Paste = state as Paste;
        if (validatePaste(newPaste)) {
            dispatch(postPaste(newPaste, redirectToCreatedPaste));
        }
    }

    const redirectToCreatedPaste = (pasteUrl: string) => {
        // Redirect current url path to paste url
        history.push(`/p/${pasteUrl}`);
    }

    return (
        <div className={classes.root}>
            <div className="field">
                <TextField 
                    label="Title"
                    fullWidth
                    error={state.title.length === 0}
                    helperText={state.title.length === 0 ? "Required" : ""}
                    onBlur={event => setState(
                        { ...state, title: event.target.value }
                    )}
                />
            </div>
            <div className="field">
                <TextField 
                    label="Content"
                    multiline 
                    rows={20}
                    fullWidth
                    variant="outlined"
                    error={state.content.length === 0}
                    helperText={state.content.length === 0 ? "Required" : ""}
                    onBlur={event => setState(
                        { ...state, content: event.target.value }
                    )}
                />
            </div>
            <div className="field">
                <InputLabel id="ttl-select-label">Expiration</InputLabel>
                <Select
                    labelId="ttl-select-label"
                    id="ttl-select"
                    required
                    value={state.ttl}
                    defaultValue={state.ttl}
                    onChange={event => setState(
                        { ...state, ttl: event.target.value as number})
                    }
                >
                    {
                        expirationValues.map((value, index) => (
                            <MenuItem 
                                key={index}
                                value={value.seconds}
                            >
                                { value.label }
                            </MenuItem>
                        ))
                    }
                </Select>
            </div>
            <div className="field">
                <Button 
                    variant="contained" 
                    color="primary"
                    onClick={submit}
                >
                    Create paste
                </Button>
            </div>
        </div>
    )
}

export { PasteForm };