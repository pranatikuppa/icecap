import React from 'react';
import './Component.css';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { animateScroll as scroll } from "react-scroll";
  
/**
 * The MainInfoPage component.
 */
export default function MainInfoPage(props) {

  /**
   * Styles used to customize text and other components within the
   * MainInfoPage.
   */
  const mainStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(4),
        width: window.screen.width,
        height: window.screen.height,
      },
    },
    mainText: {
      display: 'flex',
      flexWrap: 'wrap',
      color: props.tColor,
      fontWeight: 600,
      fontSize: '150px',
      fontFamily: 'Open-Sans',
      marginLeft: theme.spacing(10),
      marginTop: theme.spacing(15),
      marginRight: theme.spacing(1),
    },
    subMainText: {
      display: 'flex',
      flexWrap: 'wrap',
      color: props.tColor,
      fontSize: '35px',
      fontWeight: 600,
      fontFamily: 'Open-Sans',
      marginLeft: theme.spacing(11),
      marginRight: theme.spacing(1),
    },
    subText: {
      display: 'flex',
      flexWrap: 'wrap',
      color: props.tColor,
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
      backgroundColor: props.tColor,
      color: props.bColor,
      marginTop: theme.spacing(5),
      marginRight: theme.spacing(1),
      marginLeft: theme.spacing(11),
    },
    button2: {
      display: 'flex',
      flexWrap: 'wrap',
      backgroundColor: props.tColor,
      color: props.bColor,
      marginRight: theme.spacing(1),
      marginLeft: theme.spacing(11),
      marginBotton: theme.spacing(5),
      marginTop: theme.spacing(5),
    },
    buttonDiv: {
      display: 'flex',
      flexDirection: 'row',
      flex: 1,
    }
  }));

  /**
   * The styles used in the components below.
   */
  const classes = mainStyles();

  /**
   * Handler method that controlls the page scroll to the software.
   */
  const scrollToStart = () => {
    scroll.scrollTo(1.73 * window.screen.height);
  };

  /**
   * Handler method that controlls the page scroll to the tutorial.
   */
  const scrollToTutorial = () => {
    scroll.scrollTo(0.875 * window.screen.height);
  };

  /**
   * The components that make up the MainInfoPage.
   */
  return (
    <div className={classes.root}>
      <Paper elevation={0} className={props.logoStyle} style={{ height: 3*window.screen.height/4, width: window.screen.width }}>
        <div>  
          <Typography className={classes.mainText}>ICEcΔp</Typography>
          <Typography className={classes.subMainText}>
            (Interactive Convention Editor)
          </Typography>
          <Typography className={classes.subText}>
            We all have faced issues with the 200+ style check errors that appear right when we are ready to submit our CS 61B
            projects. In three easy steps below, you can get rid of many style check errors from your project.
          </Typography>
          <div className={classes.buttonDiv}>
              <Button
                  className={classes.button}
                  disableElevation
                  variant='contained'
                  onClick={scrollToStart}
                >
                  Start Editing
              </Button>
              <Button
                className={classes.button2}
                disableElevation
                variant='contained'
                onClick={scrollToTutorial}
              >
                Mini Tutorial
              </Button>
          </div>
        </div>
      </Paper>
    </div>
  );
}