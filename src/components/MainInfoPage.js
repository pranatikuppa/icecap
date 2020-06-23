import React from 'react';
import '/Users/khushidesai/icecap/src/App.css';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { animateScroll as scroll } from "react-scroll";

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
      marginTop: theme.spacing(10),
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
      backgroundColor: 'white',
      color: '#154854',
      marginTop: theme.spacing(5),
      marginRight: theme.spacing(1),
      marginLeft: theme.spacing(11),
    },
  }));
  
export default function MainInfoPage() {
  const classes = mainStyles();
  const scrollToTop = () => {
    scroll.scrollTo(6*window.screen.height/7);
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
      </Paper>
    </div>
  );
}