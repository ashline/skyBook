import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

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
    pink: {
        backgroundColor: "pink"
    },
    yellow: {
        backgroundColor: "yellow"
    },
    cardContent: {
        flexGrow: 1,
    },
}));

const files = [{ id: "new" }];

const FileBox = () => {
    const classes = useStyles();
    return (
        <Container className={classes.cardGrid} fixed>
            <Grid container justify="space-between" spacing={4}>
                <Grid xs={3} item className={classes.pink}>
                    <Grid container alignItems="center" direction="column" spacing={8}>
                        <Grid className={classes.iconContainer} item >
                            <Icon className={classes.icon}>backuptwotone</Icon>
                            <Typography align="center">
                                upload
                            </Typography>
                        </Grid>
                        <Grid className={classes.iconContainer} item>
                            <Icon className={classes.icon}>createtwotone</Icon>
                            <Typography align="center">
                                type
                            </Typography>
                        </Grid>
                        <Grid className={classes.iconContainer} item>
                            <Icon className={classes.icon}>micTwoTone</Icon>
                            <Typography align="center">
                                record audio
                            </Typography>
                        </Grid>
                        <Grid className={classes.iconContainer} item>
                            <Icon className={classes.icon}>camera</Icon>
                            <Typography align="center">
                                take picture
                            </Typography>
                        </Grid>
                        <Grid className={classes.iconContainer} item>
                            <Icon className={classes.icon}>videocamtwotone</Icon>
                            <Typography align="center">
                                record video
                            </Typography>
                        </Grid>
                    </Grid>
                    <Typography align="center">
                        Select an action to begin
                    </Typography>
                </Grid>
                <Grid item xs={8} className={classes.yellow}>
                    <Grid container justify="center" className={classes.yellow}>
                        {files.map(({ id }) => (
                            <Grid item key={id} xs={10}>
                                <Card className={classes.card}>
                                    <CardMedia
                                        className={classes.cardMedia}
                                        image="https://source.unsplash.com/random"
                                        title="Image title"
                                    />
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            Heading
                                        </Typography>
                                        <Typography>
                                            This is a media card. You can use this section to describe the content.
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" color="primary">
                                            View
                                        </Button>
                                        <Button size="small" color="primary">
                                            Edit
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}

export default FileBox
