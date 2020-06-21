import React, { Component } from 'react';
import './App.css';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import StepperPage from './StepperPage';
import image from './assets/mountain_image.jpeg';
import { animateScroll as scroll } from "react-scroll";
import ContactButton from './components/ContactButton';


class App extends Component {
  render() {
    return (
      <div>
          <PageHeader></PageHeader>
          <MainInfoPage></MainInfoPage>
          <StepperPage></StepperPage>
      </div>
    );
  }
}

const appBarStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    color: '#6493a1',
  },
}));

function PageHeader() {
  const classes = appBarStyles();

  return (
    <div className={classes.root}>
      <AppBar elevation={0} position="static" color='inherit'>
        <Toolbar>
          <Typography variant="App-header" className={classes.title}>
            ICEcΔp v1.0
          </Typography>
          {/* <Button variant="App-header" target="_blank" href="https://docs.google.com/forms/d/1A8qwG5T8pZIKmCaPYYSiEoqgzKsWMKBYmpUAqJ4zWw0/prefill" className={classes.button} color="inherit">contact us</Button> */}
          <ContactButton></ContactButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}

const mainStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(7),
      width: theme.spacing(window.screen.width),
      height: theme.spacing(window.screen.height),
    },
  },
  mainText: {
    display: 'flex',
    flexWrap: 'wrap',
    color: 'white',
    fontWeight: 600,
    fontSize: '150px',
    fontFamily: 'Open-Sans',
    marginLeft: theme.spacing(10),
    marginTop: theme.spacing(13),
    marginRight: theme.spacing(1),
  },
  subMainText: {
    display: 'flex',
    flexWrap: 'wrap',
    color: 'white',
    fontSize: '35px',
    fontWeight: 600,
    fontFamily: 'Open-Sans',
    marginLeft: theme.spacing(11),
    marginRight: theme.spacing(1),
  },
  subText: {
    display: 'flex',
    flexWrap: 'wrap',
    color: 'white',
    fontSize: '18px',
    fontWeight: 600,
    fontFamily: 'Open-Sans',
    marginLeft: theme.spacing(11),
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(8),
  },
  button: {
    display: 'flex',
    flexWrap: 'wrap',
    backgroundColor: '#6493a1',
    color: 'white',
    marginTop: theme.spacing(5),
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(11),
  },
}));

function MainInfoPage() {
  const classes = mainStyles();

  const scrollToTop = () => {
    scroll.scrollToBottom();
  };

  return (
    <div className={classes.root}>
      <Paper elevation={0} className='Logo' style={{ height: 2*window.screen.height/3, width: window.screen.width }}>
        <div>  
          <Typography className={classes.mainText}>ICEcΔp</Typography>
          <Typography className={classes.subMainText}>
            (Interactive Convention Editor)
          </Typography>
          <Typography className={classes.subText}>
            We all have faced issues with the 200+ style check errors that appear right when we are ready to submit our CS 61B
            projects. In three easy steps below, you can get rid of many style check errors from your project.
          </Typography>
            <Button
                className={classes.button}
                disableElevation
                variant='contained'
                onClick={scrollToTop}
              >
                Start
            </Button>
        </div>
        {/* <img src='./assets/mountain_image.jpeg' width='80px' height='80ox'></img> */}
      </Paper>
    </div>
  );
}

export default App;