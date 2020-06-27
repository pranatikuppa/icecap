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
  
function getSteps() {
  return ['Choose a file', 'Choose operations', 'Download your file'];
}

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

function VerticalLinearStepper() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

    const [operationOpen, setOperationOpen] = React.useState(false);
    const [fileOpen, setFileOpen] = React.useState(false);
    const [acceptedOpen, setAcceptedOpen] = React.useState(false);
    const [rejectedOpen, setRejectedOpen] = React.useState(false);

    const [javaSelected, setJava] = React.useState(false);
    const [singleSelected, setSingle] = React.useState(false);
    const [multiSelected, setMulti] = React.useState(false);
    const [indentSelected, setIndent] = React.useState(false);
    const [whiteSelected, setWhite] = React.useState(false);
    const [uploadedFiles, setUploadedFiles] = React.useState({});
    const [fixedFileContents, setFixedFileContents] = React.useState({});
    const [newFileNames, setNewFileNames] = React.useState([]);
    const [intialAcceptedFiles, setIntialAcceptedFiles] = React.useState([]);
    const [intialRejectedFiles, setIntialRejectedFiles] = React.useState([]);

    function fileCallback(oldName, newName) {
      setNewFileNames(newFileNames.map(function(filename){return (filename === oldName ? newName : filename)}));
    }

    const handleButton = () => {
      if (activeStep === 0) {
        handleNext();
      } else if (activeStep === 1) {
        handleRun();
      } else {
        handleDownloadAll();
      }
    }
  
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
  
    const handleBack = () => {
        if (activeStep === 1) {
          setJava(false);
          setSingle(false);
          setMulti(false);
          setWhite(false);
          setIndent(false);
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

    function performAll() {
      const java = new Javadocs();
      const single = new SingleLines();
      const multi = new MultiLines();
      const white = new Whitespaces();
      const indent = new Indentations();
      var i;
      var contentList = [];
      for (i = 0; i < uploadedFiles.length; i++) {
        var inputFile = uploadedFiles[i];
        fileAccessMethod(inputFile).then(function(fileText) {
          var fixedText = fileText;
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
          }
          if (indentSelected) {
            fixedText = indent.fixIndentations(fixedText);
          }
          contentList.push(fixedText);
        });
      }
      setFixedFileContents(contentList);
    }

    const handleRun = () => {
      if (activeStep === 1) {
        if (!javaSelected && !singleSelected && !multiSelected && !whiteSelected && !indentSelected) {
            setOperationOpen(true);
        } else {
            setOperationOpen(false);
            performAll();
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
      }
    }

    const handleDownloadAll = () => {
      var i;
      for (i = 0; i < newFileNames.length; i++) {
        var newFileName = newFileNames[i];
        var content = fixedFileContents[i];
        download(newFileName, content);
      }
    }

    function download(filename, text) {
      var element = document.createElement('a');
      element.setAttribute('href', 'data:.java;charset=utf-8,' + encodeURIComponent(text));
      element.setAttribute('download', filename);
    
      element.style.display = 'none';
      document.body.appendChild(element);
    
      element.click();
    
      document.body.removeChild(element);
    }
  
    const handleReset = () => {
      setJava(false);
      setSingle(false);
      setMulti(false);
      setWhite(false);
      setIndent(false);
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

    function JavadocToggle() {
        return (
          <StyledToggle value="javadoc" selected={javaSelected} onChange={() => {setJava(!javaSelected);}}>
              <CodeIcon />  Add Javadocs
          </StyledToggle>
        );
    }

    function SingleToggle() {
        return (
            <StyledToggle value="single" selected={singleSelected} onChange={() => {setSingle(!singleSelected);}}>
                <SubjectIcon /> Remove // Comments
            </StyledToggle>
        );
    }

    function MultiToggle() {
        return(
            <StyledToggle value="multi" selected={multiSelected} onChange={() => {setMulti(!multiSelected);}}>
                <SubjectIcon /> Remove /* Comments
            </StyledToggle>
        );
    }

    function WhitespaceToggle() {
        return(
          <StyledToggle value="whitespace" selected={whiteSelected} onChange={() => {setWhite(!whiteSelected);}}>
              <SpaceBarIcon /> Fix Whitespaces
          </StyledToggle>
        );
    }

    function IndentationToggle() {
        return (
          <StyledToggle value="indent" selected={indentSelected} onChange={() => {setIndent(!indentSelected);}}>
              <FormatIndentIncreaseIcon /> Fix Indentations
          </StyledToggle>
        );
    }

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

    function getFileList(list) {
      var fullString = "";
      var i;
      for (i = 0; i < list.length; i++) {
        fullString += list[i].name + ", ";
      }
      fullString = fullString.substring(0, fullString.length - 2);
      return fullString;
    }
  
    function getRejectFileList(num) {
      var fullString = "";
      return fullString + num + " file was not uploaded due to incorrect format";
    }

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

    function stepTwo() {
        return (
          <Typography>
              <p> Chooose the operations you want to perform on the .java files. The software will only apply
                 the selected operations on the contents of the .java files and you can download the fixed version
                 in the next step:
              </p>
              <div style={{ whiteSpace: 'break-spaces', lineHeight: 4.5 }}>
                  <p></p>
                  <JavadocToggle></JavadocToggle><span>    </span><SingleToggle><span>    </span></SingleToggle><span>    </span><MultiToggle></MultiToggle><span>    </span><WhitespaceToggle></WhitespaceToggle><span>    </span><IndentationToggle></IndentationToggle>
                  <p></p>
              </div>
          </Typography>
        );
    }

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
    
    function stepThree() {
      return (
        <Typography>
          Enter a name for each file and download the files below. If you don't provide a name we will use the original file name
          to download your file.
          <p></p>
          {getFileDownloadComponents()}
          <p></p>
        </Typography>
      );
    }

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
        {activeStep === steps.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Typography>All steps completed - you&apos;re finished</Typography>
            <Button onClick={handleReset} className={classes.button} variant='contained' disableElevation>
              Reset
            </Button>
          </Paper>
        )}
      </div>
    );
  }

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