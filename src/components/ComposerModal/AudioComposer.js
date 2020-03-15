import React, { Fragment, useState, useCallback } from 'react';
import { ReactMic } from '@cleandersonlobo/react-mic';
import uniqueId from "lodash/uniqueId"

import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';

import { AUDIO } from "../../modules/constants"

const useStyles = makeStyles(theme => ({
    audioTrack: {
        width: "436px",
    },
}))

const AudioComposer = ({ onSubmit }) => {
    const classes = useStyles()
    const [isRecording, setIsRecording] = useState(false)
    const onStop = useCallback((recordedBlob) => {
        const id = uniqueId()
        onSubmit([{ file: { name: `audio recording ${id}.mp3`, type: "audio/mp3", contentType: AUDIO }, blob: recordedBlob }])
    }, [onSubmit])
    return (
        <Fragment>
            <h2 id="transition-modal-title">Record audio</h2>
            <div>
                <ReactMic
                    record={isRecording}
                    className={classes.audioTrack}
                    onStop={onStop}
                    strokeColor="#000000"
                    backgroundColor="#FF4081"
                    mimeType="audio/mp3" />

                {!isRecording && <Button onClick={() => { setIsRecording(true) }} size="small" color="primary">Start</Button>}
                {isRecording && <Button onClick={() => { setIsRecording(false) }} size="small" color="primary">Stop</Button>}
            </div>
        </Fragment>
    )
}

export default AudioComposer
