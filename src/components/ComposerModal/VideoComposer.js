import React, { Fragment } from 'react';
import uniqueId from "lodash/uniqueId"
import VideoRecorder from 'react-video-recorder'

import { VIDEO } from '../../modules/constants';

const VideoComposer = ({ onSubmit }) => {
    return (
        <Fragment>
            <h2 id="transition-modal-title">Record video</h2>
            <VideoRecorder
                onRecordingComplete={(videoBlob) => {
                    const id = uniqueId()
                    onSubmit([{ file: { name: `video recording ${id}.webm`, type: "video/webm", contentType: VIDEO }, blob: videoBlob }])
                }}
            />
        </Fragment>
    )
}

export default VideoComposer
