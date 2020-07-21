import Paper from '@material-ui/core/Paper';
import Collapse from '@material-ui/core/Collapse';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Select from 'react-select';
import RmJavadocs from './RmJavadocs';
import SingleLines from './SingleLines';
import Javadocs from './Javadocs';
import Whitespaces from './Whitespaces';
import MultiLines from './MultiLines';
import Dropzone from 'react-dropzone';
import AceEditor from 'react-ace';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-katzenmilch";
import "ace-builds/src-noconflict/theme-nord_dark";
import makeAnimated from 'react-select/animated';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import { diff as DiffEditor } from "react-ace";
import DialogContentText from '@material-ui/core/DialogContentText';
import { borderedTextFieldStylesHook } from '@mui-treasury/styles/textField/bordered';


export default function EditorPage(props) {

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
    anchorOrigin: {
        vertical: "bottom",
        horizontal: "left"
    },
    transformOrigin: {
        vertical: "top",
        horizontal: "left"
    },
    getContentAnchorEl: null,
        PaperProps: {
            style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
            },
        },
    };

    const mainStyles = makeStyles((theme) => ({
        margin: {
            margin: theme.spacing(1),
        },
        dropCard: {
            backgroundColor: props.bColor,
            width: window.screen.width/2.6,
            height: window.screen.height - (window.screen.height/40),
        },
        dropCardBorder: {
            border: 'dashed',
            borderColor: '#6493a1',
            borderWidth: '2px',
            width: (window.screen.width/2.6) - 10,
            height: window.screen.height - (window.screen.height/40),
        },
        defaultCardBorder: {
            border: 'dashed',
            borderColor: props.bColor,
            borderWidth: '2px',
            width: (window.screen.width/2.6) - 10,
            height: window.screen.height - (window.screen.height/40),
        },
        icon: {
            color: '#6493a1',
        },
        root: {
          display: 'flex',
          '& > *': {
            margin: theme.spacing(2),
            marginTop: theme.spacing(9),
            width: theme.spacing(window.screen.width),
            height: theme.spacing(window.screen.height),
          },
        },
        editorDiv: {
            display: 'flex',
            flexDirection: 'row',
        },
        subText: {
            display: 'flex',
            flexWrap: 'wrap',
            color: props.tColor,
            fontSize: '17px',
            fontWeight: 400,
            fontFamily: 'Open-Sans',
        },
        paper: {
            '& > *': {
                margin: theme.spacing(1),
            },
        },
        operationCard: {
            padding: theme.spacing(1),
        },
    }));

    const useStyles = makeStyles((theme) => ({
        button: {
            backgroundColor: props.mColor,
            color: props.bColor,
            marginTop: theme.spacing(1),
            marginRight: theme.spacing(1),
            '&:hover': {
              backgroundColor: '#537b86',
            },
            fontFamily: 'Open-Sans',
            fontWeight: 600,
        },
        input: {
            display: 'none',
        },
        smallHeading: {
            fontFamily: 'Open-Sans',
            fontWeight: 600,
            fontSize: 11,
            color: props.tColor
        },
        disableButton: {
            backgroundColor: props.iColor,
            color: "#C0C0C0",
            marginTop: theme.spacing(1),
            marginRight: theme.spacing(1),
            fontFamily: 'Open-Sans',
            fontWeight: 600,
            '&:hover': {
                backgroundColor: '#D3D3D3',
            },
        },
    }));

    const animatedComponents = makeAnimated();

    const classes = mainStyles();
    const itemClasses = useStyles();
    const inputBaseStyles = borderedTextFieldStylesHook.useInputBase();
    const [inputText, setInputText] = React.useState("");
    const [fileTextList, setFileTextList] = React.useState([]);
    const [uploadedFiles, setUploadedFiles] = React.useState([]);
    const [fileName, setFileName] = React.useState("");
    const [newFileName, setNewFileName] = React.useState("");
    const [index, setIndex] = React.useState(0);
    const [isEditing, setIsEditing] = React.useState(false);
    const [chosenOperations, setChosenOperations] = React.useState([]);
    const [firstDisplay, setFirstDisplay] = React.useState("");
    const [secondDisplay, setSecondDisplay] = React.useState("");
    const [openField, setOpenField] = React.useState(false);
    const [fixedText, setFixedText] = React.useState("");
    const [openDiff, setOpenDiff] = React.useState(false);
    const [diffVal, setDiffVal] = React.useState([]);

    const operations = [
        { value: 0, label: 'Remove Javadocs' },
        { value: 1, label: 'Remove // Comments' },
        { value: 2, label: 'Remove /* Comments' },
        { value: 3, label: 'Add Javadocs' },
        { value: 4, label: 'Fix Whitespaces' },
    ];

    function handleTextChange(newText) {
        setIsEditing(true);
        if (fileTextList.length > 0) {
          var oldText = fileTextList[index];
          setFileTextList(fileTextList.map(function(filetext){return (filetext === oldText ? newText : filetext)}));
        } else {
          setInputText(newText);
          setFirstDisplay(newText);
          setFileName("File1.java");
        }
    }

    function getFirstDisplayText() {
        if (!isEditing) {
          if (uploadedFiles.length !== 0) {
            var inputFile = uploadedFiles[index];
            fileAccessMethod(inputFile).then(function(fileText) {
              if (fileText === fileTextList[index]) {
                setFirstDisplay(fileText);
              } else {
                setFirstDisplay(fileTextList[index]);
              }
            });
          } else {
              setFirstDisplay(inputText);
          }
          return firstDisplay;
        }
    }

    function validateFilename(name) {
        var otherPattern = new RegExp("\\W");
        if (name.trim() === "" || otherPattern.exec(name)) {
            return fileName;
        } else {
            name = name.replace(" ", "_");
            if (!name.includes(".") && !name.includes(".java")) {
                return name + ".java";
            } else if (name.includes(".")) {
                var dotIndex = name.indexOf(".", 0);
                return name.substring(0, dotIndex) + ".java";
            } else {
                return name;
            }
        }
    }

    const handleFileNameChange = (event) => {
        setNewFileName(event.target.value);
    };

    function getOptions() {
        if (uploadedFiles.length === 0) {
            return [];
        } else {
            var options = [];
            var i;
            for (i = 0; i < uploadedFiles.length; i++) {
                options.push({value: i, label: uploadedFiles[i].name});
            }
            return options;
        }
    }

    function getSelector() {
        var fileOptions = getOptions();
        if (fileOptions.length === 0) {
            return <Select
            isSearchable={false}
            placeholder="Select file"
            options={fileOptions}
            onChange={handleChange}
            theme={theme => ({
                ...theme,
                colors: {
                ...theme.colors,
                primary25: '#e3ecef',
                primary: '#6493a1',
                neutral80: '#154854',
                neutral90: '#154854',
                },
            })}
            >
            </Select>;   
        } else {
            return <Select
            isSearchable={false}
            value={fileOptions[index]}
            options={fileOptions}
            onChange={handleChange}
            theme={theme => ({
                ...theme,
                colors: {
                ...theme.colors,
                primary25: '#e3ecef',
                primary: '#6493a1',
                neutral80: '#154854',
                neutral90: '#154854',
                },
            })}
            >
            </Select>;
        }
    }

    const handleChange = (event) => {
        if (uploadedFiles.length !== 0) {
          setIsEditing(false);
          setIndex(event.value);
          setFirstDisplay(fileTextList[event.value]);
          setFileName(uploadedFiles[event.value].name);
        }
    };

    function handleDrop(acceptedFiles) {
        if (acceptedFiles.length !== 0) {
            var i;
            var texts = [];
            for(i = 0; i < acceptedFiles.length; i++) {
            var inputFile = acceptedFiles[i];
            fileAccessMethod(inputFile).then(function(fileText){
                texts.push(fileText);
            });
            }
            setFileTextList(texts);
            setUploadedFiles(Array.from(acceptedFiles));
            setFileName(acceptedFiles[0].name);
        }
    }

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

    function handleOperationSelect(value, action) {
        if (value === null) {
            setChosenOperations([]);
            return;
        }
        switch (action) {
          case 'clear':
            value = [];
            break;
        }
        setChosenOperations(value);
    }

    function handleRun() {
        var newText = firstDisplay;
        var selected = chosenOperations.map((op) =>  {return op.value});
        if (selected.includes(0)) {
            var rmJava = new RmJavadocs();
            newText = rmJava.removeJavadocs(newText);
        }
        if (selected.includes(1)) {
            var single = new SingleLines();
            newText = single.removeSingleLines(newText);
        }
        if (selected.includes(2)) {
            var multi = new MultiLines();
            newText = multi.removeMultiLines(newText);
        }
        if (selected.includes(3)) {
            var java = new Javadocs();
            newText = java.addJavadocs(newText);
        }
        if (selected.includes(4)) {
            var whitespace = new Whitespaces();
            newText = whitespace.fixWhitespaces(newText);
        }
        setSecondDisplay(newText);
        setFixedText(newText);
    }

    function getSecondDisplayText() {
        if (secondDisplay === "") {
            return <AceEditor
            mode="java"
            width={(window.screen.width/2.6)}
            height={window.screen.height - (window.screen.height/40)}
            theme={props.eTheme}
            onChange={handleSecondTextChange}
            >
            </AceEditor>;
        } else {
            return <AceEditor
            theme={props.eTheme}
            mode="java"
            width={(window.screen.width/2.6)}
            height={window.screen.height - (window.screen.height/40)}
            onChange={handleSecondTextChange}
            value={secondDisplay}
            >
            </AceEditor>;
        }
    }

    function handleSecondTextChange(newText) {
        setSecondDisplay(newText);
        setFixedText(newText);
    }

    function handleClear() {
        setFixedText("");
        setSecondDisplay("");
        setFirstDisplay("");
        setIndex(0);
        setChosenOperations([]);
        setFileName("");
    }

    function getChangeFileNameButton() {
        if (openField) {
            return <Button className={itemClasses.button} onClick={() => {setOpenField(!openField)}}>Done</Button>;
        } else {
            return <Button className={itemClasses.button} onClick={() => {setOpenField(!openField)}}>Change Filename</Button>;
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

    function handleDownload() {
        if (newFileName !== "") {
            var validated = validateFilename(newFileName);
            download(validated, fixedText);
        } else {
            download(fileName, fixedText);
        }
    }

    function handleDiffOpen() {
        setDiffVal([firstDisplay, fixedText]);
        setOpenDiff(true);
    }

    function handleDiffClose() {
        setOpenDiff(false);
    }

    function handleDiffChange(newVal) {
        setDiffVal([firstDisplay, newVal[1]]);
    }

    function applyChanges() {
        setFixedText(diffVal[1]);
        setSecondDisplay(diffVal[1]);
    }

    return(
        <div className={classes.root}>
            <Paper className={classes.paper} elevation={0} style={{ backgroundColor: props.bColor, height: window.screen.height, width: window.screen.width}}>
                <div style={{ flex: 1, flexDirection: 'row', display: 'flex' }}>
                    <Card className={classes.operationCard} elevation={0} style={{ backgroundColor: props.hColor, width: window.screen.width/6, height: window.screen.height - (window.screen.height/28) }}>
                        <GridList cellHeight={window.screen.height/1.5} cellWidth={window.screen.width/7} cols={1}>
                            <div style={{ whiteSpace: 'break-spaces' }}>
                                <Typography className={itemClasses.smallHeading}>
                                    FILES
                                </Typography>
                                <p></p>
                                {getSelector()}
                                <p></p>
                                <input
                                accept=".java"
                                className={itemClasses.input}
                                id="contained-button-file"
                                multiple
                                type="file"
                                />
                                <label htmlFor="contained-button-file">
                                <Button 
                                variant="contained" 
                                component="span"
                                className={itemClasses.button}
                                disableElevation
                                onClick={() => {
                                    document.getElementById('contained-button-file').onchange = function(event) {
                                    var fileList = event.target.files;
                                    handleDrop(fileList, []);
                                }
                                }}
                                >
                                    Upload Files
                                </Button>
                                </label>
                                <p></p>
                                <div style={{ whiteSpace: 'break-spaces', minHeight: 40 }}>
                                    <p></p>
                                </div>
                                <Typography className={itemClasses.smallHeading}>
                                    OPERATIONS
                                </Typography>
                                <p></p>
                                <Select
                                value={chosenOperations}
                                animatedComponents={animatedComponents}
                                placeholder="Select operations"
                                options={operations}
                                isClearable={true}
                                isMulti
                                closeMenuOnSelect={false}
                                onChange={handleOperationSelect}
                                theme={theme => ({
                                    ...theme,
                                    colors: {
                                    ...theme.colors,
                                    primary25: '#e3ecef',
                                    primary: '#6493a1',
                                    dangerLight: '#6493a1',
                                    danger: '#154854',
                                    neutral10: '#e3ecef',
                                    neutral80: '#154854',
                                    neutral90: '#154854',
                                    },
                                })}
                                >
                                </Select>
                                <p></p>
                                {chosenOperations.length === 0 || firstDisplay === "" ? <Button variant="contained" disableElevation disableRipple className={itemClasses.disableButton}>Run</Button> :
                                <Button disableElevation variant="contained" className={itemClasses.button} onClick={handleRun}>Run</Button>}
                                <div style={{ whiteSpace: 'break-spaces', minHeight: 40 }}>
                                    <p></p>
                                </div>
                                <Typography className={itemClasses.smallHeading}>
                                    DOWNLOADING
                                </Typography>
                                <Collapse in={openField}>
                                    <p></p>
                                    <TextField 
                                    InputProps={{ classes: inputBaseStyles, disableUnderline: true }}
                                    placeholder={'filename'}
                                    value={newFileName}
                                    onChange={handleFileNameChange}
                                    variant="outlined"
                                    />
                                    <p></p>
                                </Collapse>
                                <p></p>
                                {fixedText === "" ? 
                                <Button variant="contained" disableElevation disableRipple className={itemClasses.disableButton}>Change Filename</Button> :
                                getChangeFileNameButton()}
                                <p></p>
                                {fixedText !== "" ? <Button className={itemClasses.button} onClick={handleDownload}>Download File</Button> :
                                <Button component="span" variant="contained" disableElevation disableRipple className={itemClasses.disableButton}>Download File</Button>}
                                <p></p>
                                {fixedText !== "" ? <Button className={itemClasses.button} onClick={handleDiffOpen}>View Difference</Button> :
                                <Button disableElevation disableRipple variant="contained" className={itemClasses.disableButton}>View Difference</Button>}
                                <Dialog
                                    maxWidth='lg'
                                    fullWidth
                                    PaperProps={{
                                        style: {
                                            height: window.screen.height/1.2,
                                            backgroundColor: props.bColor,
                                        }
                                    }}
                                    open={openDiff}
                                    onClose={handleDiffClose}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogTitle className={classes.subText} id="alert-dialog-title">{"View the differences in your code below:"}</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText className={classes.subText}>The highlighted lines show the differences between your original code (on the left) and the version fixed by ICEcap (on the right). 
                                        Making changes within the text editors will show live updates on the changed lines and will not directly update the files in the live editor. Use the "Apply Changes" button to apply edits to the live editor.</DialogContentText>
                                        <div style={{ display: 'flex', flex: 1, flexDirection: 'row' }}>
                                            <DiffEditor
                                            className={"codeMarker"}
                                            onChange={handleDiffChange}
                                            width={window.screen.width/1.65}
                                            height={window.screen.height/1.6}
                                            value={diffVal}
                                            setOptions={{useWorker: false}}
                                            mode="java"
                                            theme={props.eTheme}
                                            >
                                            </DiffEditor>
                                        </div>
                                    </DialogContent>
                                    <DialogActions>
                                    {diffVal[1] === secondDisplay || diffVal[1] === fixedText ?
                                    <Button disableElevation disableRipple className={itemClasses.disableButton}>Apply Changes</Button> :
                                    <Button disableElevation onClick={applyChanges} className={itemClasses.button}>Apply Changes</Button>}
                                    <Button disableElevation onClick={handleDiffClose} className={itemClasses.button}>
                                        Close
                                    </Button>
                                    </DialogActions>
                                </Dialog>
                            </div>
                        </GridList>
                    </Card>
                    <span>   </span>
                    <Dropzone className={classes.dropCard} onDrop={handleDrop} accept='.java'>
                        {({getRootProps, getInputProps, isDragActive, isDragReject, isDragAccept, acceptedFiles, rejectedFiles}) => (
                        <section style={{ width: window.screen.width/2.6, height: window.screen.height - (window.screen.height/40)}}>
                            <div {...getRootProps({onClick: event => event.stopPropagation()})}>
                            <input {...getInputProps()} />
                            {!isDragActive ? 
                                <div className={classes.defaultCardBorder}>
                                <div className='Dropzone2'>
                                    <AceEditor
                                    value={getFirstDisplayText()}
                                    mode="java"
                                    onChange={handleTextChange}
                                    theme={props.eTheme}
                                    width={(window.screen.width/2.6)}
                                    height={window.screen.height - (window.screen.height/40)}
                                    >
                                    </AceEditor>
                                </div>
                                </div>:
                                <div className={classes.dropCardBorder}>
                                <div className='Dropzone2' style={{ width: window.screen.width/2.6, height: window.screen.height - (window.screen.height/40) }}>
                                    <p></p>
                                    <CloudUploadIcon className={classes.icon} fontSize='large'></CloudUploadIcon>
                                    <p style={{ color: '#6493a1', whiteSpace: 'break-spaces' }}>Drop it here!</p>
                                    <p></p>
                                </div>
                                </div>
                            }
                            </div>
                        </section>
                        )}
                    </Dropzone>
                    <span>       </span>
                    {getSecondDisplayText()}
                </div>
            {/* <Typography className={classes.subText}>Upload files with the button or by dragging and dropping, or directly copy and paste your code in the textbox below. 
            Choose 1 or more operations using the selector and click run. You can change the file name and edit the fixed code before downloading. Using the "View Difference" button
             you can see highlighted differences between your original file and the fixed file.
            </Typography>
                <div className={classes.editorDiv}>
                <FileUploader eTheme={props.eTheme} mColor={props.mColor} tColor={props.tColor} bColor={props.bColor} callback={inputCallback} callbackFilename={filenameCallback}></FileUploader>
                <Operator diffHighlight={props.diffHighlight} eTheme={props.eTheme} mColor={props.mColor} tColor={props.tColor} bColor={props.bColor} originalText={inputText} fileName={filename}></Operator>
                </div> */}
            </Paper>
        </div>
    );
}