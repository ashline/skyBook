import React, { useState, useCallback } from 'react';
import remove from "lodash/remove"
import cloneDeep from "lodash/cloneDeep"

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { generateUUID } from "../../modules/helpers"
import { EMPTY, FILE, AUDIO, VIDEO, NOTE, PICTURE } from "../../modules/constants"

import Dropzone from "../Dropzone"
import ComposerModal from "../ComposerModal"

// TODO:
// support file upload
//      picture, video, text maybe any kind of file
// support taking notes and saving as part of the html file
// support recording audio files and playing them back when embeded in final html
// support recording video and playing back when embeded in final html
// support taking pictures and embeding them in the final html
const useStyles = makeStyles(theme => ({
    icon: {
        fontSize: "40px",
        marginBottom: theme.spacing(1)
    },
    iconContainer: {
        // marginRight: theme.spacing(2),
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        cursor: "pointer"
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    fileName: {
        width: "100%",
        textOverflow: "ellipsis",
        overflow: "hidden",
        whiteSpace: "nowrap",
    }
}));

const renderItem = (file, addFile, removeFile) => {
    switch (file.contentType) {
        case AUDIO:
        case VIDEO:
        case PICTURE:
        case FILE:
        case NOTE:
            return <ItemCard file={file} removeFile={removeFile} />
        default:
            return <Dropzone onDrop={addFile} />
    }
}

const ItemCard = ({ file, removeFile }) => {
    const classes = useStyles();
    const { id, name, type } = file
    return (
        <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
                <Typography className={classes.fileName} gutterBottom variant="h5" component="h2">
                    {name}
                </Typography>
                <Typography>
                    {type}
                </Typography>
            </CardContent>
            <CardActions>
                <Button onClick={() => removeFile(id)} size="small" color="secondary">
                    Remove
                </Button>
            </CardActions>
        </Card>
    )
}

const Creator = () => {
    const [files, setFiles] = useState([{ id: EMPTY, contentType: EMPTY }]);
    const [composerMode, setComposerMode] = useState("")
    const addFile = useCallback(loadedFiles => {
        const loadedFilesWithIDs = loadedFiles.map(file => ({ id: generateUUID(), ...file }))
        setFiles([...loadedFilesWithIDs, ...files])
    }, [files])
    const removeFile = useCallback(fileID => {
        const filesClone = cloneDeep(files)
        remove(filesClone, { id: fileID })
        setFiles(filesClone)
    }, [files])
    const classes = useStyles();
    return (
        <Container className={classes.cardGrid} fixed>
            <ComposerModal mode={composerMode} onSubmit={addFile} handleClose={() => setComposerMode("")} />
            <Grid container justify="space-between" spacing={4}>
                <Grid xs={3} item className={classes.pink}>
                    <Grid container alignItems="center" direction="column" spacing={8}>
                        <Grid className={classes.iconContainer} item onClick={() => setComposerMode(NOTE)}>
                            <Icon className={classes.icon}>createtwotone</Icon>
                            <Typography align="center">
                                type
                            </Typography>
                        </Grid>
                        <Grid className={classes.iconContainer} item onClick={() => setComposerMode(AUDIO)}>
                            <Icon className={classes.icon}>micTwoTone</Icon>
                            <Typography align="center">
                                record audio
                            </Typography>
                        </Grid>
                        <Grid className={classes.iconContainer} item onClick={() => setComposerMode(PICTURE)}>
                            <Icon className={classes.icon}>camera</Icon>
                            <Typography align="center">
                                take picture
                            </Typography>
                        </Grid>
                        <Grid className={classes.iconContainer} item onClick={() => setComposerMode(VIDEO)}>
                            <Icon className={classes.icon}>videocamtwotone</Icon>
                            <Typography align="center">
                                record video
                            </Typography>
                        </Grid>
                        <Grid className={classes.iconContainer} item>
                            <Icon className={classes.icon}>savetwotone</Icon>
                            <Typography align="center">
                                Save
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={8} className={classes.yellow}>
                    <Grid container justify="center" spacing={3} className={classes.yellow}>
                        {files.map(({ id, file }) => (
                            <Grid item key={id} xs={10}>
                                {renderItem({ id, ...file }, addFile, removeFile)}
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Creator
