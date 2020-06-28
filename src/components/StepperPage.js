import Paper from '@material-ui/core/Paper';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import StepContent from '@material-ui/core/StepContent';
import UploadButtons from './UploadButtons';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import SpaceBarIcon from '@material-ui/icons/SpaceBar';
import SubjectIcon from '@material-ui/icons/Subject';
import FormatIndentIncreaseIcon from '@material-ui/icons/FormatIndentIncrease';
import CodeIcon from '@material-ui/icons/Code';
import ToggleButton from '@material-ui/lab/ToggleButton';
import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';
import './Component.css';
import Javadocs from './Javadocs'; 
import FileDownloadComponent from './FileDownloadComponent';
import SingleLines from './SingleLines';
import MultiLines from './MultiLines';
import Whitespaces from './Whitespaces';
import Indentations from './Indentations';
import RmJavadocs from './RmJavadocs';

/**
 * The styles that are used to customize the components below.
 */
const mainStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(7),
        width: theme.spacing(window.screen.width),
        height: theme.spacing(window.screen.height),
      },
    },
}));
const useStyles = makeStyles((theme) => ({
    root: {
        color: '#6493a1',
        width: '70%',
        height: '100%',
        margin: 30,
    },
    button: {
        backgroundColor: '#6493a1',
        '&:hover': {
          backgroundColor: '#537b86',
        },
        color: 'white',
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    backButton: {
        color: '#154854',
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    resetContainer: {
        padding: theme.spacing(3),
        backgroundColor: '#e3ecef'
    },
    step: {
        color: '#154854',
    },
}));

/**
 * The styled toggle button that is customized according to the
 * app theme.
 */
const StyledToggle = withStyles({
  root: {
    color: '#white',
    borderColor: '#white',
    whiteSpace: 'break-spaces',
    '&:hover': {
      borderColor: '#6493a1',
    },
  },
  selected: {
    '&:active': {
      backgroundColor: '#5c8794',
    },
    backgroundColor: '#bcf5bc',
    color: '#154854',
    borderColor: '#154854',
    label: '#154854'
  },
  label: {
    '&:active': {
      color: '#154854',
    },
    '&:hover': {
      color: '#6493a1',
    },
  }
})(ToggleButton);
  
/**
 * Method that returns the step headers for the main stepper.
 */
function getSteps() {
  return ['Choose a file', 'Choose operations', 'Download your file'];
}

/**
 * The theme that is applied to the icons of the stepper.
 */
const iconTheme = createMuiTheme({
    props: {
        MuiStepIcon: {
            root: {
                color: '#6493a1',
            },
            active: {
                color: '#6493a1',
            },
            disabled: {
              color: 'white',
            }
        },
    },
});

/**
 * The vertical linear stepper component.
 */
function VerticalLinearStepper() {
    /**
     * The classes and the step variables that are used to track
     * the state of the stepper.
     */
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

    /**
     * The variables that are used to track the states of the different 
     * alerts 
     */
    const [operationOpen, setOperationOpen] = React.useState(false);
    const [fileOpen, setFileOpen] = React.useState(false);
    const [acceptedOpen, setAcceptedOpen] = React.useState(false);
    const [rejectedOpen, setRejectedOpen] = React.useState(false);

    /**
     * The variables that indicate which operations were selected.
     */
    const [javaSelected, setJava] = React.useState(false);
    const [singleSelected, setSingle] = React.useState(false);
    const [multiSelected, setMulti] = React.useState(false);
    const [indentSelected, setIndent] = React.useState(false);
    const [whiteSelected, setWhite] = React.useState(false);
    const [rmJavaSelected, setRmJavaSelected] = React.useState(false);

    /**
     * The variables that keep track of the updated file names, the accepted files,
     * the rejected files and the fixed file contents.
     */
    const [intialAcceptedFiles, setIntialAcceptedFiles] = React.useState([]);
    const [intialRejectedFiles, setIntialRejectedFiles] = React.useState([]);
    const [uploadedFiles, setUploadedFiles] = React.useState({});
    const [fixedFileContents, setFixedFileContents] = React.useState({});
    const [newFileNames, setNewFileNames] = React.useState([]);

    /**
     * Callback method that takes in the updated file name and replaces it
     * within the new files state array.
     * @param {String} oldName the old name of the file.
     * @param {String} newName the new name of the file.
     */
    function fileCallback(oldName, newName) {
      setNewFileNames(newFileNames.map(function(filename){return (filename === oldName ? newName : filename)}));
    }

    /**
     * Handler method that handles the click of the next 
     * button during each step of the stepper.
     */
    const handleButton = () => {
      if (activeStep === 0) {
        handleNext();
      } else if (activeStep === 1) {
        handleRun();
      } else {
        handleDownloadAll();
      }
    }
  
    /**
     * Handler method that handles the click of the next
     * button specifically moving from the upload
     * stage to the operation stage.
     */
    const handleNext = () => {
      if (activeStep === 0) {
        if (uploadedFiles.length > 0) {
          setFileOpen(false);
          setAcceptedOpen(false);
          setRejectedOpen(false);
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        } else {
          setFileOpen(true);
        }
      }
    };
  
    /**
     * Handler method that handles the click of the back button
     * based on which stage the user is on in the stepper.
     */
    const handleBack = () => {
        if (activeStep === 1) {
          setJava(false);
          setSingle(false);
          setMulti(false);
          setWhite(false);
          setIndent(false);
          setRmJavaSelected(false);
          if (operationOpen) {
              setOperationOpen(false);
          }
          setAcceptedOpen(true);
          if (intialRejectedFiles.length <= 0) {
            setRejectedOpen(false);
          } else {
            setRejectedOpen(true);
          }
          setActiveStep((prevActiveStep) => prevActiveStep - 1);
        } else if (activeStep === 2) {
          handleReset();
        } else {
          setActiveStep((prevActiveStep) => prevActiveStep - 1);
        }
    };

    /**
     * Method that access the file contents and calls the resolve
     * method to use the content accessed.
     * @param {File} inputFile the file uploaded by the user.
     */
    function fileAccessMethod(inputFile){
      return new Promise(
      function(resolve) {
      var reader = new FileReader();
      reader.onloadend = (function(reader)
      {
          return function() {
          resolve(reader.result);
          }
      })(reader);
      reader.readAsText(inputFile);
      });
    }

    /**
     * Method that calls all the operations depending
     * on which operations were selected.
     */
    function performAll() {
      const java = new Javadocs();
      const single = new SingleLines();
      const multi = new MultiLines();
      const white = new Whitespaces();
      const indent = new Indentations();
      const rmJava = new RmJavadocs();
      var i;
      var contentList = [];
      for (i = 0; i < uploadedFiles.length; i++) {
        var inputFile = uploadedFiles[i];
        fileAccessMethod(inputFile).then(function(fileText) {
          var fixedText = fileText;
          if (rmJavaSelected) {
            fixedText = rmJava.removeJavadocs(fixedText);
          }
          if (javaSelected) {
            fixedText = java.addJavadocs(fixedText);
          }
          if (singleSelected) {
            fixedText = single.removeSingleLines(fixedText);
          }
          if (multiSelected) {
            fixedText = multi.removeMultiLines(fixedText);
          }
          if (whiteSelected) {
            fixedText = white.fixWhitespaces(fixedText);
          }
          if (indentSelected) {
            fixedText = indent.fixIndentations(fixedText);
          }
          contentList.push(fixedText);
        });
      }
      setFixedFileContents(contentList);
    }

    /**
     * Handler method that handles the run function and 
     * displays alerts if no operations have been selected.
     */
    const handleRun = () => {
      if (activeStep === 1) {
        if (!javaSelected && !singleSelected && !multiSelected && !whiteSelected && !indentSelected && !rmJavaSelected) {
            setOperationOpen(true);
        } else {
            setOperationOpen(false);
            performAll();
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
      }
    }

    /**
     * Handler method that handles the downloading
     * of all files.
     */
    const handleDownloadAll = () => {
      var i;
      for (i = 0; i < newFileNames.length; i++) {
        var newFileName = newFileNames[i];
        var content = fixedFileContents[i];
        download(newFileName, content);
      }
    }

    /**
     * Helper method that downloads a single file using
     * the filename and the content provided.
     * @param {String} filename the name of the file.
     * @param {String} text the content of the file.
     */
    function download(filename, text) {
      var element = document.createElement('a');
      element.setAttribute('href', 'data:.java;charset=utf-8,' + encodeURIComponent(text));
      element.setAttribute('download', filename);
    
      element.style.display = 'none';
      document.body.appendChild(element);
    
      element.click();
    
      document.body.removeChild(element);
    }
  
    /**
     * Handler method that performs a reset on all
     * state variables for reuse in a second round 
     * of the stepper series.
     */
    const handleReset = () => {
      setJava(false);
      setSingle(false);
      setMulti(false);
      setWhite(false);
      setIndent(false);
      setRmJavaSelected(false);
      if (operationOpen) {
        setOperationOpen(false);
      }
      if (fileOpen) {
        setFileOpen(false);
      }
      if (acceptedOpen) {
        setAcceptedOpen(false);
      }
      if (rejectedOpen) {
        setRejectedOpen(false);
      }
      setUploadedFiles({});
      setIntialRejectedFiles([]);
      setIntialAcceptedFiles([]);
      setFixedFileContents({});
      setNewFileNames([]);
      setActiveStep(0);
    };

    /**
     * StyledToggle used to create the Add Javadoc button.
     */
    function JavadocToggle() {
        return (
          <StyledToggle value="javadoc" selected={javaSelected} onChange={() => {setJava(!javaSelected);}}>
              <CodeIcon />  Add Javadocs
          </StyledToggle>
        );
    }

    /**
     * StyledToggle used to create the Remove // Comments button.
     */
    function SingleToggle() {
        return (
            <StyledToggle value="single" selected={singleSelected} onChange={() => {setSingle(!singleSelected);}}>
                <SubjectIcon /> Remove // Comments
            </StyledToggle>
        );
    }

    /**
     * StyledToggle used to create the Remove /* Comments button.
     */
    function MultiToggle() {
        return(
            <StyledToggle value="multi" selected={multiSelected} onChange={() => {setMulti(!multiSelected);}}>
                <SubjectIcon /> Remove /* Comments
            </StyledToggle>
        );
    }

    /**
     * StyledToggle used to create the Fix Whitespaces button.
     */
    function WhitespaceToggle() {
        return(
          <StyledToggle value="whitespace" selected={whiteSelected} onChange={() => {setWhite(!whiteSelected);}}>
              <SpaceBarIcon /> Fix Whitespaces
          </StyledToggle>
        );
    }

    /**
     * StyledToggle used to create the Fix Indentations button.
     */
    function IndentationToggle() {
        return (
          <StyledToggle value="indent" selected={indentSelected} onChange={() => {setIndent(!indentSelected);}}>
              <FormatIndentIncreaseIcon /> Fix Indentations
          </StyledToggle>
        );
    }

    /**
     * StyledToggle used to create the Remove Javadocs button.
     */
    function RmJavadocsToggle() {
      return (
        <StyledToggle value="rmJava" selected={rmJavaSelected} onChange={() => {setRmJavaSelected(!rmJavaSelected);}}>
            <FormatIndentIncreaseIcon /> Remove Javadocs
        </StyledToggle>
      );
    }

    /**
     * Method that is called when files are added to the uploader. Both 
     * rejected and accepted files are passed in for display.
     * @param {FileList, Array} acceptedFiles the array of files or the list of accepted files.
     * @param {FileList, Array} rejectedFiles the array of files or the list of rejected files.
     */
    function onFileDrop(acceptedFiles, rejectedFiles) {
      acceptedFiles = Array.from(acceptedFiles);
      rejectedFiles = Array.from(rejectedFiles);
      setIntialAcceptedFiles(acceptedFiles);
      setIntialRejectedFiles(rejectedFiles);
      if (acceptedFiles.length <= 0) {
        setAcceptedOpen(false);
      } else {
        setAcceptedOpen(true);
      }
      if (rejectedFiles.length <= 0) {
        setRejectedOpen(false);
      } else {
        setRejectedOpen(true);
      }
      setUploadedFiles(acceptedFiles);
      var nameList = acceptedFiles.map(function(file){return file.name});
      setNewFileNames(nameList);
      if (acceptedFiles.length > 0) {
        setFileOpen(false);
      }
    }

    /**
     * Returns a string representation of the list of files
     * in order to display in the alert.
     * @param {Array} list the list of files.
     */
    function getFileList(list) {
      var fullString = "";
      var i;
      for (i = 0; i < list.length; i++) {
        fullString += list[i].name + ", ";
      }
      fullString = fullString.substring(0, fullString.length - 2);
      return fullString;
    }
  
    /**
     * Returns a string representation of the number of files
     * that were rejected to display in the alert.
     * @param {number} num the number of files.
     */
    function getRejectFileList(num) {
      var fullString = "";
      return fullString + num + " file was not uploaded due to incorrect format";
    }

    /**
     * Returns the components that make up the first step in the stepper.
     */
    function stepOne() {
      return (
        <Typography>
            Upload files (.java file) for which you would like the program to clear style check errors:
            <p></p>
            <UploadButtons onFileDropped={onFileDrop}></UploadButtons>
            <p></p>
        </Typography>
      );
    }

    /**
     * Returns the components that make up the second step in the stepper.
     */
    function stepTwo() {
        return (
          <Typography>
              <p> Chooose the operations you want to perform on the .java files. The software will only apply
                 the selected operations on the contents of the .java files and you can download the fixed version
                 in the next step:
              </p>
              <div style={{ whiteSpace: 'break-spaces', lineHeight: 4.5 }}>
                  <p></p>
                  <JavadocToggle></JavadocToggle><span>    </span>
                  <SingleToggle></SingleToggle><span>    </span>
                  <MultiToggle></MultiToggle><span>    </span>
                  <WhitespaceToggle></WhitespaceToggle><span>    </span>
                  <IndentationToggle></IndentationToggle><span>    </span>
                  <RmJavadocsToggle></RmJavadocsToggle>
                  <p></p>
              </div>
          </Typography>
        );
    }

    /**
     * Creates the file download components using the fixed
     * file information and returns a list of the components to be 
     * added to the third step in the stepper.
     */
    function getFileDownloadComponents() {
      var i;
      var componentList = [];
      for (i = 0; i < newFileNames.length; i++) {
        var name = newFileNames[i];
        componentList.push(
          <div>
          <FileDownloadComponent callbackFromParent={fileCallback} defaultFileName={name} contentList={fixedFileContents} fileIndex={i}></FileDownloadComponent>
          </div>
        );
      }
      return componentList;
    }
    
    /**
     * Returns the components that make up the third step in the stepper.
     */
    function stepThree() {
      return (
        <Typography>
          Enter a name for each file (without spaces) and download the files below. If you don't provide a name we will use the original file name
          to download your file.
          <p></p>
          {getFileDownloadComponents()}
          <p></p>
        </Typography>
      );
    }

    /**
     * Returns the content of each step based on the number
     * of the step provided.
     * @param {number} step the step number.
     */
    function getStepContent(step) {
        switch (step) {
          case 0:
              return stepOne();
          case 1:
              return stepTwo();
          case 2:
              return stepThree();
          default:
              return 'Unknown step';
        }
    }

    /**
     * Returns the stepper that contains all the information
     * and functionality to run the software UI.
     */
    return (
      <div className={classes.root}>
        <Stepper activeStep={activeStep} orientation="vertical" style={{ backgroundColor: '#e3ecef'}}>
          {steps.map((label, index) => (
            <Step key={label} className={classes.step}>
                <ThemeProvider theme={iconTheme}>
                    <StepLabel>
                        <Typography className='Step-header'>
                            {label}
                        </Typography>
                    </StepLabel>
                </ThemeProvider>
              <StepContent>
                <Typography>{getStepContent(index)}</Typography>
                <Collapse in={acceptedOpen}>
                  <p></p>
                  <Alert width='100px'>{getFileList(intialAcceptedFiles)}</Alert>
                  <p></p>
                </Collapse>
                <Collapse in={rejectedOpen}>
                  <p></p>
                  <Alert width='100px' severity="error">{getRejectFileList(intialRejectedFiles.length)}</Alert>
                  <p></p>
                </Collapse>
                <Collapse in={fileOpen} timeout='auto'> 
                    <p></p>
                    <Alert severity="error">Please upload at least one file</Alert>
                    <p></p>
                </Collapse>
                <Collapse in={operationOpen} timeout='auto'> 
                    <p></p>
                    <Alert severity="error">Please select at least one operation</Alert>
                    <p></p>
                </Collapse>
                <div className={classes.actionsContainer}>
                  <div>
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className={classes.backButton}
                    >
                      {activeStep === 2 && 'Reset'}
                      {activeStep < 2 && 'Back'}
                    </Button>
                    <Button
                      onClick={handleButton}
                      className={classes.button}
                      disableElevation
                      variant='contained'
                    >
                      {activeStep === 0 && 'Next'}
                      {activeStep === 1 && 'Run'}
                      {activeStep === 2 && 'Download All Files'}
                    </Button>
                  </div>
                </div>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </div>
    );
  }

  /**
   * The stepper page itself, which is a paper that surrounds the 
   * stepper and contains the vertical linear stepper widget.
   */
export default function StepperPage() {
    const classes = mainStyles();
  
    return(
      <div className={classes.root}>
        <Paper elevation={0} style={{ backgroundColor: '#e3ecef', height: 6*window.screen.height/7, width: window.screen.width}}>
            <VerticalLinearStepper>
            </VerticalLinearStepper>
        </Paper>
      </div>
    );
  
}