import React, { useCallback } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import { NOTE, AUDIO, VIDEO, PICTURE } from "../../modules/constants"

import NoteComposer from "./NoteComposer"
import VideoComposer from "./VideoComposer"
import AudioComposer from "./AudioComposer"
import PictureComposer from "./PictureComposer"

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        borderRadius: "3px",
        boxShadow: theme.shadows[5],
        width: "500px",
        padding: theme.spacing(2, 4, 3),
        outline: "none",
    },
}));

const renderComposer = (mode, onSubmit) => {
    switch (mode) {
        case AUDIO:
            return <AudioComposer onSubmit={onSubmit} />
        case VIDEO:
            return <VideoComposer onSubmit={onSubmit} />
        case PICTURE:
            return <PictureComposer onSubmit={onSubmit} />
        case NOTE:
        default:
            return <NoteComposer onSubmit={onSubmit} />
    }
}

const ComposerModal = ({ mode, onSubmit, handleClose }) => {
    const classes = useStyles()
    const handleSubmit = useCallback((fileData) => {
        onSubmit(fileData)
        handleClose()
    }, [handleClose, onSubmit])
    return (
        <Modal
            className={classes.modal}
            open={!!mode}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={!!mode}>
                <div className={classes.paper}>
                    {renderComposer(mode, handleSubmit)}
                </div>
            </Fade>
        </Modal>
    )

}

export default ComposerModal
