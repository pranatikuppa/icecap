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

const mainStyles = makeStyles((theme) => ({
  stepperRoot: {
    width: "100%"
  },
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(3),
      width: theme.spacing(window.screen.width),
      height: theme.spacing(window.screen.height),
    },
  },
  backButton: {
    marginRight: theme.spacing(1)
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  paper: {
    '& > *': {
        margin: theme.spacing(3),
    },
  },
  button: {
    backgroundColor: '#6493a1',
    color: 'white',
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
    '&:hover': {
      backgroundColor: '#537b86',
    },
  },
  backButton: {
    marginRight: theme.spacing(1)
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  stepLabel: {
    color: '#6493a1',
    fontFamily: 'Open-Sans',
  }
}));

function getSteps() {
  return [
    "Preliminary",
    "Uploading",
    "Selecting Operations",
    "Downloading",
    "Final Steps"
  ];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return "check errors";
    case 1:
      return "upload";
    case 2:
      return "choose stuff";
    case 3:
      return "you download";
    case 4:
      return "check before turn in";
    default:
      return "Unknown stepIndex";
  }
}

function HorizontalLabelPositionBelowStepper() {
  const classes = mainStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const QontoConnector = withStyles({
    alternativeLabel: {
      top: 10,
      left: 'calc(-50% + 16px)',
      right: 'calc(50% + 16px)',
    },
    active: {
      '& $line': {
        borderColor: '#784af4',
      },
    },
    completed: {
      '& $line': {
        borderColor: '#784af4',
      },
    },
    line: {
      borderColor: '#eaeaf0',
      borderTopWidth: 3,
      borderRadius: 1,
    },
  })(StepConnector);

  const useQontoStepIconStyles = makeStyles({
    root: {
      color: '#6493a1',
      display: 'flex',
      height: 22,
      alignItems: 'center',
    },
    active: {
      color: '#6493a1',
    },
    circle: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      backgroundColor: '#6493a1',
    },
    completed: {
      color: '#6493a1',
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
      <Stepper alternativeLabel activeStep={activeStep} style={{ width: 1250, backgroundColor: '#e3ecef'}}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>All steps completed</Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
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
              <Button disableElevation variant="contained" className={classes.button} onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function TutorialPage() {

    const classes = mainStyles();

    return(
        <div className={classes.root}>
            <Paper className={classes.paper} elevation={0} style={{ backgroundColor: '#e3ecef', height: 4*window.screen.height/5, width: window.screen.width }}>
                <HorizontalLabelPositionBelowStepper></HorizontalLabelPositionBelowStepper>
            </Paper>
        </div>
    );
}