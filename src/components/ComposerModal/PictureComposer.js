import React, { Fragment } from 'react';
import uniqueId from "lodash/uniqueId"
import Camera from 'react-html5-camera-photo';
import { makeStyles } from '@material-ui/core/styles';

import 'react-html5-camera-photo/build/css/index.css';

import { PICTURE } from '../../modules/constants';

const useStyles = makeStyles(theme => ({
    container: {
        '& video': {
            width: "initial",
        },
        '& img': {
            width: "initial",
        },
    },
}));

const PictureComposer = ({ onSubmit }) => {
    const classes = useStyles()
    return (
        <Fragment>
            <h2 id="transition-modal-title">Take a picture</h2>
            <div className={classes.container}>
                <Camera
                    idealResolution={{ width: 430 }}
                    onTakePhotoAnimationDone={(dataUri) => {
                        const id = uniqueId()
                        onSubmit([{ file: { name: `picture ${id}.png`, type: "image/png", contentType: PICTURE }, blob: dataUri }])
                    }}
                />
            </div>
        </Fragment>
    )
}

export default PictureComposer
