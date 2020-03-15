import React, { Fragment, useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import Alert from '@material-ui/lab/Alert'
import Paper from '@material-ui/core/Paper';
import RootRef from '@material-ui/core/RootRef';
import Snackbar from '@material-ui/core/Snackbar';
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles';

import { FAIL, FILE, SUCCESS } from "../../modules/constants"


const useStyles = makeStyles(theme => ({
    box: {
        fontSize: "40px",
        paddingTop: theme.spacing(16),
        paddingBottom: theme.spacing(16),
        marginBottom: theme.spacing(1),
        textAlign: "center",
        borderStyle: "dashed",
        borderWidth: "3px",
        cursor: "pointer",
        backgroundColor: theme.palette.background.paper
    },
}));

const Snacks = ({ type, onClose }) => (
    <Fragment>
        <Snackbar open={type === SUCCESS} autoHideDuration={5000} onClose={onClose}>
            <Alert onClose={onClose} severity="success">
                The file was loaded successfully
            </Alert>
        </Snackbar>
        <Snackbar open={type === FAIL} autoHideDuration={5000} onClose={onClose}>
            <Alert onClose={onClose} severity="error">
                There was an error loading the file
            </Alert>
        </Snackbar>
    </Fragment>
)

const Dropzone = ({ onDrop }) => {
    const [snackType, setSnackType] = useState("")
    const onFail = useCallback(() => setSnackType(FAIL), [])
    const onSuccess = useCallback((files) => {
        setSnackType(SUCCESS)
        onDrop(files)
    }, [onDrop])
    const dropCallback = useCallback((acceptedFiles) => {
        const promises = []
        acceptedFiles.forEach((file) => {
            promises.push(processFile(file));
        })
        Promise.all(promises).then(files => {
            onSuccess(files)
        }).catch(onFail)
    }, [onFail, onSuccess])
    const { getRootProps, getInputProps } = useDropzone({ onDrop: dropCallback })
    const { ref, ...rootProps } = getRootProps()
    const classes = useStyles();

    return (
        <RootRef rootRef={ref}>
            <Paper variant="outlined" className={classes.box} {...rootProps}>
                <input {...getInputProps()} />
                <Typography>Click or drag and drop a file here or click to on the actions on the right to add content</Typography>
                <Snacks type={snackType} onClose={() => setSnackType("")} />
            </Paper>
        </RootRef>
    )
}

function processFile(file) {
    const promise = new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = reject
        reader.onabort = reject
        reader.onload = () => {
            const { name, type } = file
            resolve({ file: { name, type, contentType: FILE }, blob: reader.result });
        };
        reader.readAsArrayBuffer(file);
    })
    return promise
}

export default Dropzone
