// import React from 'react';
// import './Component.css';
// import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
// import { animateScroll as scroll } from "react-scroll";
// import { makeStyles } from '@material-ui/core';



// export default function TutorialPage() {

//     const classes = mainStyles();

//     return(
//         <div className={classes.root}>
//             <Paper elevation={0} style={{ backgroundColor: '#e3ecef', height: 4*window.screen.height/5, width: window.screen.width }}>
//                 This is the tutorial page.
//             </Paper>
//         </div>
//     );
// }


import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

//FIX THE BUTTON LOCATION LATER
/* TODO: 
    - fix button location / text tab 
    - fix color scheme
    - find out how to format contents of each 'page' associated with each choice of the stepper
    - ^ stepperPage.js (stepOne, stepTwo, stepThree)
*/

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  backButton: {
    marginRight: theme.spacing(1)
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}));

//titles for each of the tutorial sections
function getSteps() {
  return [
    "Preliminary",
    "Uploading",
    "Selecting Operations",
    "Downloading",
    "Final Steps"
  ];
}


//need to fill in this with what is returned for each section (indiv pg setup)
//textbox, two-column setup for each gifs
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

export default function HorizontalLabelPositionBelowStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed
            </Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>
              {getStepContent(activeStep)}
            </Typography>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
