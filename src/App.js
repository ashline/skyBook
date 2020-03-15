import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Icon from '@material-ui/core/Icon'
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Creator from './components/Creator';

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4, 0, 4),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export default function Book() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Icon className={classes.icon}>book</Icon>
          <Typography variant="h6" color="inherit" noWrap>
            skyBook
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="lg">
            <Typography component="h2" variant="h3" align="center" color="textPrimary" gutterBottom>
              Welcome to skyBook
            </Typography>
            <Typography variant="h6" align="center" color="textSecondary" paragraph>
              This is a scrap book powered by skyNet distributed platform which allows
               you to scrap together voice notes, songs, pictures, notes and videos.
               You can even take new photos, videos and voice notes without leaving the site!
               After saving you will get a link that you can share with your friends and loved ones.
            </Typography>
            {/* <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary">
                    Main call to action
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary">
                    Secondary action
                  </Button>
                </Grid>
              </Grid>
            </div> */}
          </Container>
        </div>
        {/* End hero unit */}
        <Creator />
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Powered by skyNet
        </Typography>
      </footer>
      {/* End footer */}
    </React.Fragment >
  );
}
