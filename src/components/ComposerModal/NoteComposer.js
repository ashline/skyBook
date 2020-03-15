import React, { useState } from 'react';
import uniqueId from "lodash/uniqueId"

import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import { NOTE } from '../../modules/constants';

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: "100%",
        },
        '& .MuiInputBase-formControl': {
            height: "200px"
        },
        '& .MuiInputBase-input:first-of-type': {
            height: "100%!important",
        }
    },
}));
const NoteComposer = ({ onSubmit }) => {
    const classes = useStyles();
    const [value, setValue] = useState("")
    const handleChange = event => {
        setValue(event.target.value);
    };
    const handleSubmit = () => {
        const id = uniqueId()
        onSubmit([{ file: { name: `note ${id}`, type: "text", contentType: NOTE }, blob: value }])
    }
    return (
        <form className={classes.root} noValidate autoComplete="off">
            <h2 id="transition-modal-title">Make a note</h2>
            <TextField
                id="outlined-textarea"
                label="Note"
                placeholder="Type in and click save to create a note"
                onChange={handleChange}
                multiline
                variant="outlined"
            />
            <div>
                <Button onClick={handleSubmit} color="primary" size="small">Submit</Button>
            </div>
        </form>
    )
}

export default NoteComposer
