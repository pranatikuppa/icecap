import React from 'react';
import './Component.css';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import Check from '@material-ui/icons/Check';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Step from '@material-ui/core/Step';
import Stepper from '@material-ui/core/Stepper';
import StepLabel from '@material-ui/core/StepLabel';
import { animateScroll as scroll } from "react-scroll";
import { makeStyles, withStyles } from '@material-ui/core';
import clsx from 'clsx';
import StepConnector from '@material-ui/core/StepConnector';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

function getSteps() {
  return [
    "Using CS 61B Materials",
    "Uploading Files",
    "Selecting Operations",
    "Downloading",
    "Final Steps"
  ];
}

function HorizontalLabelPositionBelowStepper(props) {

  const mainStyles = makeStyles((theme) => ({
    stepperRoot: {
      width: "100%"
    },
    backButton: {
      marginRight: theme.spacing(1),
      color: props.tColor,
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1)
    },
    button: {
      backgroundColor: props.mColor,
      color: props.bColor,
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1),
      '&:hover': {
        backgroundColor: '#537b86',
      },
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1)
    },
    stepLabel: {
      color: props.mColor,
    },
    stepPaper: {
      width: 1290,
      height: 400,
      padding: theme.spacing(3),
      backgroundColor: props.pColor,
    },
    headingText: {
      fontFamily: 'Open-Sans',
      color: props.tColor,
      fontWeight: 600,
      fontSize: '20px',
    },
    normalText: {
      fontFamily: 'Open-Sans',
      color: props.tColor,
    },
    code: {
      backgroundColor: '#000000',
      color: '#00FF00',
    }
  }));

  const classes = mainStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  //for stepOne: can we hyperlink the 61b style guide into the words '61B style guide'?
  function stepOne() {
    return (
      <div>
        {/* JUST CHECK THE TEXT AND MATCH IT UP AND REPLACE WHATEVER YOU NEED. IF YOU WANT THE COOL CODE STYLE JUST COPY THE
        TAGS AROUND THE MAKE STYLE TEXT AND USE IT FOR WHATEVER SEGMENTS OF TEXT YOU WANT IT LIKE THAT

        FOR THE HEADING STYLE TEXT VERSUS THE NORMAL TEXT REPLACE "className={classes.normalText}" with 
        "className={classes.headingText}". IF YOU RUN INTO ISSUES WITH THIS ONE LEMME KNOW. 

        TO ADD LINE SPACES BETWEEN SECTIONS OR OBJECTS JUST ADD <p></p> LIKE I DID. IT'S CHEATING BUT THE LINE HEIGHT STUFF
        NEVER WORKS SMH.

        ALSO SPECIFICALLY FOR THE ALERT IF YOU WANT THE USER TO BE ABLE TO CLOSE IT AFTER THEY READ IT LEMME KNOW ILL ADD
        THAT

 */}
        <Paper elevation ={0} className={classes.stepPaper}>
          <Alert severity="warning" variant="standard">
            <AlertTitle>Disclaimer:</AlertTitle>
            ICEcap does not claim to be a be-all, end-all editing service. We <strong>highly </strong> 
            recommend manually checking your code, and using the class provided review mechanisms (make style, make check) before
            turning in your code. Under no circumstance should you turn in your code <strong>only</strong> after running it through ICEcap.
          </Alert>
          <p></p>
          <Typography className={classes.headingText}>Getting Started</Typography>
          <p></p>
          <Typography className={classes.normalText}>Use  <code className={classes.code}> make style</code> to get an idea of the kinds of errors your code has to better understand
          what operations you might want to select. If you are confused about the errors that come up after running make style, be sure to 
          access the 61B style guide, and reference the guidelines posted there. These are also the same guidelines we are basing our 
          automated corrections on. </Typography>
          <Typography className={classes.normalText}> We're here to help with the objective errors - namely working with comments (Javadocs, Multiline, Single Line)
          and whitespace issues. Please plan accordingly so you know what you'll need to manually fix after using ICEcΔp!
          </Typography>
        </Paper>
      </div>
    );
  }

  function stepTwo() {
    return(
      <div>
        {/* GO TO THE FILE Component.css WITHIN THE COMPONENTS FOLDER. I WROTE OUT INSTRUCTIONS TO REPLACE GIFS. 
          TEXT SHOULD BE EASIER TO REPLACE JUST FOLLOW WHERE THE TEXTS MATCH UP FROM THE SCREEN AND THE 
          WIDGETS. */}
        <Paper elevation={0} className={classes.stepPaper}>
          <div style={{display: 'flex', flexDirection: 'row', whiteSpace: 'break-spaces', lineHeight: 3}}>
            <div style={{ lineHeight: 3, whiteSpace: 'break-spaces'}}>
              <Typography className={classes.headingText}>Static</Typography>
              <Typography className={classes.normalText}>Using our static editor, you can either drag and drop or selectively upload our files. 
              Keep in mind that using the static editor won't allow you to edit the files onsite.</Typography>
              <p></p>
              <Paper style={{ width: 625, height: 300}} className="staticUpload" elevation={0}></Paper>
            </div>
            <span>      </span>
            <div style={{ lineHeight: 3, whiteSpace: 'break-spaces'}}>
              <Typography className={classes.headingText}>Live</Typography>
              <Typography className={classes.normalText}>Using our live editor, you can edit your files after uploading them. 
              With multiple files, you can select different ones from the drop-down menu and make your necessary changes!</Typography>
              <p></p>
              <Paper style={{ width: 625, height: 300}} className="OkGif" elevation={0}></Paper>
            </div>
          </div>
        </Paper>
      </div>
    );
  }

  function stepThree() {
    return(
      <div>
        <Paper elevation={0} className={classes.stepPaper}>
          <div style={{display: 'flex', flexDirection: 'row', whiteSpace: 'break-spaces', lineHeight: 3}}>
            <div style={{ lineHeight: 3, whiteSpace: 'break-spaces'}}>
              <Typography className={classes.headingText}>Static</Typography>
              <Typography className={classes.normalText}>Select the buttons for as many operations as you'd like to apply. Each time you make a selection, 
              you'll see the button color change. </Typography>
              <p></p>
              <Paper style={{ width: 625, height: 300}} className="staticChooseOps" elevation={0}></Paper>
            </div>
            <span>      </span>
            <div style={{ lineHeight: 3, whiteSpace: 'break-spaces'}}>
              <Typography className={classes.headingText}>Live</Typography>
              <Typography className={classes.normalText}>Select one or more operations from the dropdown menu. Each time you make a selection, you'll see it added to
              the dropdown header. </Typography>
              <p></p>
              <Paper style={{ width: 625, height: 300}} className="OkGif" elevation={0}></Paper>
            </div>
          </div>
        </Paper>
      </div>
    );
  }

  function stepFour() {
    return(
      <div>
        <Paper elevation={0} className={classes.stepPaper}>
        <Alert severity="warning" variant="standard">
            <AlertTitle>Note:</AlertTitle>
            None of your original files are edited. Once you are done, if you download your files be sure to make the necessary replacements
            so that your original files contain the edited, style-corrected content. Be sure to always save copies of your original files, by committing them 
            to prevent any unintended data loss, or allow yourself to revert to a prior version. 
          </Alert>
          <div style={{display: 'flex', flexDirection: 'row', whiteSpace: 'break-spaces', lineHeight: 3}}>
            <div style={{ lineHeight: 3, whiteSpace: 'break-spaces'}}>
              <Typography className={classes.headingText}>Static</Typography>
              <Typography className={classes.normalText}>Edit the names of your files before downloading as desired. You can download them individually, or all together. </Typography>
              <p></p>
              <Paper style={{ width: 625, height: 300}} className="staticDownload" elevation={0}></Paper>
            </div>
            <span>      </span>
            <div style={{ lineHeight: 3, whiteSpace: 'break-spaces'}}>
              <Typography className={classes.headingText}>Live</Typography>
              <Typography className={classes.normalText}>Edit the names of your files before downloading as you desire. Or, feel free to simply copy-paste 
                the edited content from the rightmost textbox directly into the desired file.</Typography>
              <p></p>
              <Paper style={{ width: 625, height: 300}} className="OkGif" elevation={0}></Paper>
            </div>
          </div>
        </Paper>
      </div>
    );
  }

  function stepFive() {
    return(
      <div>
        <Paper elevation={0} className={classes.stepPaper}>
          <Typography className={classes.headingText}>Some Kind of Heading</Typography>
          <p></p>
          <Typography className={classes.normalText}> That's about it! If you'd like to know what errors were made and how we corrected them, 
          click on 'View Difference', which can be found in the live editor. We highly encourage doing this to help you understand your errors!
          Make sure to run <code className={classes.code}>make style</code> and <code className={classes.code}>make check</code> before 
          turning any final code that you have edited using our service, to ensure that no other issues have 
          arisen! We’d also recommend using your manual testing (integration tests, unit tests, etc.) to confirm 
          that your project/HW works as intended. </Typography>
          <Typography className={classes.normalText}>
          Good luck with your submission!
          </Typography>
          <Typography className={classes.normalText}>Some other text you would like to add here. copy over the code tags around the text parts you wanna
            make into code format.
          </Typography>
        </Paper>
      </div>
    );
  }

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return stepOne();
      case 1:
        return stepTwo();
      case 2:
        return stepThree();
      case 3:
        return stepFour();
      case 4:
        return stepFive();
      default:
        return "Unknown stepIndex";
    }
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleScroll = () => {
    scroll.scrollTo(1.73 * window.screen.height);
  }

  const QontoConnector = withStyles({
    alternativeLabel: {
      top: 10,
      left: 'calc(-50% + 16px)',
      right: 'calc(50% + 16px)',
    },
    active: {
      '& $line': {
        borderColor: props.mColor,
      },
    },
    completed: {
      '& $line': {
        borderColor: props.mColor,
      },
    },
    line: {
      borderColor: '#CDCDCD',
      borderTopWidth: 3,
      borderRadius: 1,
    },
  })(StepConnector);

  const useQontoStepIconStyles = makeStyles({
    root: {
      color: props.mColor,
      display: 'flex',
      height: 22,
      alignItems: 'center',
    },
    active: {
      color: props.mColor,
    },
    circle: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      backgroundColor: props.mColor,
    },
    completed: {
      color: props.mColor,
      zIndex: 1,
      fontSize: 18,
    },
  });

  function QontoStepIcon(props) {
    const classes = useQontoStepIconStyles();
    const { active, completed } = props;
  
    return (
      <div
        className={clsx(classes.root, {
          [classes.active]: active,
        })}
      >
        {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
      </div>
    );
  }

  QontoStepIcon.propTypes = {
    /**
     * Whether this step is active.
     */
    active: PropTypes.bool,
    /**
     * Mark the step as completed. Is passed to child components.
     */
    completed: PropTypes.bool,
  };

  return (
    <div className={classes.stepperRoot}>
      <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />} style={{ width: 1250, backgroundColor: props.bColor}}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={QontoStepIcon}>
            <Typography className={classes.stepLabel}>{label}</Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        <div>
          <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
          <div>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              className={classes.backButton}
            >
              Back
            </Button>
            {activeStep === steps.length - 1 ? 
            <Button disableElevation variant="contained" className={classes.button} onClick={handleScroll}>Start Editing</Button>:
            <Button disableElevation variant="contained" className={classes.button} onClick={handleNext}>Next</Button>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TutorialPage(props) {

  const mainStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(3),
        width: theme.spacing(window.screen.width),
        height: theme.spacing(window.screen.height),
      },
    },
    paper: {
      '& > *': {
          margin: theme.spacing(3),
      },
    },
  }));

    const classes = mainStyles();

    return(
        <div className={classes.root}>
            <Paper className={classes.paper} elevation={0} style={{ backgroundColor: props.bColor, height: 4*window.screen.height/5, width: window.screen.width }}>
                <HorizontalLabelPositionBelowStepper pColor={props.pColor} tColor={props.tColor} bColor={props.bColor} mColor={props.mColor}></HorizontalLabelPositionBelowStepper>
            </Paper>
        </div>
    );
}