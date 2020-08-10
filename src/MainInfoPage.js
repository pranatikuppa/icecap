import React from 'react';
import { Paper, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import './components/Component.css';
  
/**
 * The MainInfoPage component.
 */
export default function MainInfoPage(props) {

  // const LIVE = 1;
  // const TUTORIAL = 3;

  /**
   * Styles used to customize text and other components within the
   * MainInfoPage.
   */
  const mainStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(2),
        marginTop: theme.spacing(9),
        width: window.innerWidth,
        height: window.innerHeight,
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

  // const goToEditor = () => {
  //   props.screenChangeCallback(LIVE);
  // }

  // const goToTutorial = () => {
  //   props.screenChangeCallback(TUTORIAL);
  // }

  /**
   * The components that make up the MainInfoPage.
   */
  return (
    <div className={classes.root}>
      <Paper elevation={0} className={props.logoStyle} style={{ height: 5*window.innerHeight/6, width: window.innerWidth }}>
        <div>  
          <Typography className={classes.mainText}>ICEcΔp</Typography>
          <Typography className={classes.subMainText}>
            (Interactive Convention Editor)
          </Typography>
          <Typography className={classes.subText}>
            We all have faced issues with the 200+ style check errors that appear right when we are ready to submit our CS 61B
            projects. In a few easy steps, you can get rid of many style check errors from your project.
          </Typography>
          <div className={classes.buttonDiv}>
              <Button
                  className={classes.button}
                  disableElevation
                  variant='contained'
                  to={"/live"}
                  component={Link}
                >
                  Start Editing
              </Button>
              <Button
                className={classes.button2}
                disableElevation
                variant='contained'
                to={"/tutorial"}
                component={Link}
              >
                Mini Tutorial
              </Button>
          </div>
        </div>
      </Paper>
    </div>
  );
}