import React from 'react';
import { Paper, Collapse, TextField, Typography, GridList, Card, Button, 
    DialogContent, DialogTitle, Dialog, DialogActions, DialogContentText, FormControlLabel, 
    Checkbox } from '@material-ui/core';
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { borderedTextFieldStylesHook } from '@mui-treasury/styles/textField/bordered';
import { bannerCheckboxStylesHook } from '@mui-treasury/styles/checkbox/banner';
import { useNeonCheckboxStyles } from '@mui-treasury/styles/checkbox/neon';
import makeAnimated from 'react-select/animated';
import Select from 'react-select';
import Dropzone from 'react-dropzone';
import AceEditor from 'react-ace';
import { diff as DiffEditor } from "react-ace";
import LongLines from './operations/LongLines';
import LongMethods from './operations/LongMethods';
import RmJavadocs from './operations/RmJavadocs';
import SingleLines from './operations/SingleLines';
import Javadocs from './operations/Javadocs';
import Whitespaces from './operations/Whitespaces';
import MultiLines from './operations/MultiLines';
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-katzenmilch";
import "ace-builds/src-noconflict/theme-nord_dark";

/**
 * The EditorPage component.
 */
export default function EditorPage(props) {

    /**
     * The styles that are used to customize elements in the 
     * editor page.
     */
    const mainStyles = makeStyles((theme) => ({
        margin: {
            margin: theme.spacing(1),
        },
        dropCard: {
            backgroundColor: props.bColor,
            width: window.innerWidth/2.6,
            height: window.innerHeight/1.24,
        },
        dropCardBorder: {
            border: 'dashed',
            borderColor: '#6493a1',
            borderWidth: '2px',
            width: (window.innerWidth/2.6) - 10,
            height: window.innerHeight/1.24,
        },
        defaultCardBorder: {
            border: 'dashed',
            borderColor: props.bColor,
            borderWidth: '2px',
            width: (window.innerWidth/2.6) - 10,
            height: window.innerHeight/1.24,
        },
        icon: {
            color: '#6493a1',
        },
        root: {
            display: 'flex',
            '& > *': {
              margin: theme.spacing(2),
              marginTop: theme.spacing(9),
              width: window.innerWidth,
              height: window.innerHeight,
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
        clearButton: {
            color: props.mColor,
            borderColor: props.mColor,
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
        linesCard: {
            '&:hover' : {
                backgroundColor: '#D3D3D3',
            }
        },
    }));

    /**
     * The color scheme for this app.
     */
    var myColor = {
        50: '#b1ced0',
        100: '#a2c4c6',
        200: '#92bbbd',
        300: '#83b1b3',
        400: '#73a7aa',
        500: '#6493a1',
        600: '#5a8e90',
        700: '#507e80',
        800: '#466e70',
        900: '#3c5e60',
        A100: '#a2c4c6',
        A200: '#92bbbd',
        A400: '#83b1b3',
    }

    /**
     * The theme that overrides the primary color
     * with the color scheme.
     */
    const textTheme = createMuiTheme({
        palette: {
          primary: myColor,
        },
    });

    /**
     * State variables and styles that are used to 
     * keep track of and display elements in the 
     * editor page.
     */
    const formControlLabelStyles = bannerCheckboxStylesHook.useFormControlLabel();
    const neonStyles = useNeonCheckboxStyles();
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
    const [markLongLinesToggle, setMarkLongLinesToggle] = React.useState(false);
    const [markLongMethodsToggle, setMarkLongMethodsToggle] = React.useState(false);
    const operations = [
        { value: 0, label: 'Remove Javadocs' },
        { value: 1, label: 'Remove // Comments' },
        { value: 2, label: 'Remove /* Comments' },
        { value: 3, label: 'Add Javadocs' },
        { value: 4, label: 'Fix Whitespaces' },
    ];

    // function handleClear() {
    //     setInputText("");
    //     setFileTextList([]);
    //     setUploadedFiles([]);
    //     setFileName("");
    //     setNewFileName("");
    //     setIndex(0);
    //     setIsEditing(false);
    //     setChosenOperations([]);
    //     setFirstDisplay("");
    //     setSecondDisplay("");
    //     setOpenField(false);
    //     setFixedText("");
    //     setOpenDiff(false);
    //     setDiffVal([]);
    // }

    /**
     * Takes in a new text and updates the states and display
     * for the first display (first editor box).
     * @param {String} newText the new text. 
     */
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

    /**
     * Updates and returns the display text for 
     * the first editor box.
     */
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

    /**
     * Takes in a filename and validates it, returning the 
     * new updated filename.
     * @param {String} name the filename.
     */
    function validateFilename(name) {
        if (name.trim() === "") {
            return fileName;
        } else {
            name = name.replace(" ", "_");
            if (name.endsWith(".java")) {
                return name;
            } else if (!name.includes(".") && !name.includes(".java")) {
                return name + ".java";
            } else if (name.includes(".")) {
                var dotIndex = name.indexOf(".", 0);
                return name.substring(0, dotIndex) + ".java";
            } else {
                return name;
            }
        }
    }

    /**
     * Handles the input typed into the textbox that
     * sets the new file name to download. 
     * @param {any} event the event.
     */
    const handleFileNameChange = (event) => {
        setNewFileName(event.target.value);
    };

    /**
     * Returns a set of options for the file selector
     * depending on the uploaded files.
     */
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

    /**
     * Returns the file selector based on the options/the
     * uploaded files.
     */
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

    /**
     * Handles the change in the file selector and updates
     * the display of the first text box accordingly.
     * @param {any} event the event.
     */
    const handleChange = (event) => {
        if (uploadedFiles.length !== 0) {
          setIsEditing(false);
          setIndex(event.value);
          setFirstDisplay(fileTextList[event.value]);
          setFileName(uploadedFiles[event.value].name);
        }
    };

    /**
     * Handles the state changes that are made in order to display the 
     * uploaded files by the user. 
     * @param {Array} acceptedFiles the files accepted by the uploader. 
     */
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

    /**
     * Function that takes in an input file and provides 
     * access to the contents of the input file.
     * @param {File} inputFile the input file.
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
     * The handler that takes in the action performed by the selector and the
     * array of options selected and updates the states accordingly.
     * @param {Array} value the array of selected values.
     * @param {Action} action the action that the selector received.
     */
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

    /**
     * Handles the execution of the operations on the input
     * file content and updates the fixed text accordingly.
     */
    function handleRun() {
        var newText = "";
        if (uploadedFiles.length === 0) {
            newText = firstDisplay;
        } else {
            newText = fileTextList[index];
        }
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
        if (markLongLinesToggle) {
            var longLines = new LongLines();
            newText = longLines.markLongLines(newText);
        }
        if (markLongMethodsToggle) {
            var longMethods = new LongMethods();
            newText = longMethods.markLongMethods(newText);
        }
        setSecondDisplay(newText);
        setFixedText(newText);
    }

    /**
     * Returns the display text for the second text box.
     */
    function getSecondDisplayText() {
        if (secondDisplay === "") {
            return <AceEditor
            mode="java"
            width={(window.innerWidth/2.6)}
            height={window.innerHeight/1.24}
            theme={props.eTheme}
            onChange={handleSecondTextChange}
            >
            </AceEditor>;
        } else {
            return <AceEditor
            theme={props.eTheme}
            mode="java"
            width={(window.innerWidth/2.6)}
            height={window.innerHeight/1.24}
            onChange={handleSecondTextChange}
            value={secondDisplay}
            >
            </AceEditor>;
        }
    }

    /**
     * Handles the text changes in the second display 
     * box and updates the state variables accordingly.
     * @param {String} newText the new text.
     */
    function handleSecondTextChange(newText) {
        setSecondDisplay(newText);
        setFixedText(newText);
    }

    /**
     * Returns the button that needs to be displayed when
     * the user is changing the file name. If the textbox is shown
     * the button displayed is "Done" otherwise it is displayed as 
     * "Change Filename"
     */
    function getChangeFileNameButton() {
        if (openField) {
            return <Button className={itemClasses.button} onClick={() => {setOpenField(!openField)}}>Done</Button>;
        } else {
            return <Button className={itemClasses.button} onClick={() => {setOpenField(!openField)}}>Change Filename</Button>;
        }
    }

    /**
     * Takes in the name and content of the file and performs
     * a download to the user's device.
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
     * Performs the donwload of the fixed file using the 
     * correct state variables.
     */
    function handleDownload() {
        if (newFileName !== "") {
            var validated = validateFilename(newFileName);
            download(validated, fixedText);
        } else {
            download(fileName, fixedText);
        }
    }

    /**
     * Opens the diff editor dialog display.
     */
    function handleDiffOpen() {
        setDiffVal([firstDisplay, fixedText]);
        setOpenDiff(true);
    }

    /**
     * Closes the diff editor dialog display.
     */
    function handleDiffClose() {
        setOpenDiff(false);
    }

    /**
     * Updates the diff editor with the new value upon changing 
     * the content of the second display editor.
     * @param {Array} newVal the new value.
     */
    function handleDiffChange(newVal) {
        setDiffVal([firstDisplay, newVal[1]]);
    }

    /**
     * Applies the changes made to the diff editor to the 
     * original display.
     */
    function applyChanges() {
        setFixedText(diffVal[1]);
        setSecondDisplay(diffVal[1]);
    }

    /**
     * Handles the selection of the long lines option.
     */
    const handleLongLinesCheck = (event) => {
        setMarkLongLinesToggle(event.target.checked);
    };

    const handleLongMethodsCheck = (event) => {
        setMarkLongMethodsToggle(event.target.checked);
    }

    return(
        <div className={classes.root}>
            <Paper className={classes.paper} elevation={0} style={{ backgroundColor: props.bColor, height: 5*window.innerHeight/6, width: window.innerWidth}}>
                <div style={{ flex: 1, flexDirection: 'row', display: 'flex' }}>
                    <Card className={classes.operationCard} elevation={0} style={{ backgroundColor: props.hColor, width: window.innerWidth/6, height: window.innerHeight/1.26 }}>
                        <GridList cellHeight={window.innerHeight/1.26} cellWidth={window.innerWidth/4} cols={1}>
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
                                <div style={{ whiteSpace: 'break-spaces', minHeight: window.innerHeight/20 }}>
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
                                <ThemeProvider theme={textTheme}>
                                    <FormControlLabel
                                        style={{ width: window.innerWidth/6.6 }}
                                        classes={formControlLabelStyles}
                                        control={
                                            <ThemeProvider theme={textTheme}>
                                                <Checkbox
                                                    checked={markLongLinesToggle}
                                                    style={{ borderColor: myColor, color: myColor, alignSelf: 'flex-start', marginTop: -3 }}
                                                    disableRipple
                                                    classes={neonStyles}
                                                    checkedIcon={<span />}
                                                    icon={<span />}
                                                    onChange={handleLongLinesCheck}
                                                />
                                            </ThemeProvider>
                                        }
                                        label={
                                        <>
                                            <Typography style={{ color: props.tColor }}>
                                                Mark lines &#8827; 80
                                            </Typography>
                                            <Typography component="span" style={{ color: props.iColor }}>
                                                Marks lines exceeding 80 chars
                                            </Typography>
                                        </>
                                        }
                                    />
                                </ThemeProvider>
                                <ThemeProvider theme={textTheme}>
                                    <FormControlLabel
                                        style={{ width: window.innerWidth/6.6 }}
                                        classes={formControlLabelStyles}
                                        control={
                                            <ThemeProvider theme={textTheme}>
                                                <Checkbox
                                                    checked={markLongMethodsToggle}
                                                    style={{ borderColor: myColor, color: myColor, alignSelf: 'flex-start', marginTop: -3 }}
                                                    disableRipple
                                                    classes={neonStyles}
                                                    checkedIcon={<span />}
                                                    icon={<span />}
                                                    onChange={handleLongMethodsCheck}
                                                />
                                            </ThemeProvider>
                                        }
                                        label={
                                        <>
                                            <Typography style={{ color: props.tColor }}>
                                                Mark methods &#8827; 60
                                            </Typography>
                                            <Typography component="span" style={{ color: props.iColor }}>
                                                Marks methods exceeding 60 lines
                                            </Typography>
                                        </>
                                        }
                                    />
                                </ThemeProvider>
                                <p></p>
                                {(chosenOperations.length === 0 && !markLongLinesToggle) || firstDisplay === ""  ? <Button variant="contained" disableElevation disableRipple className={itemClasses.disableButton}>Run</Button> :
                                <Button disableElevation variant="contained" className={itemClasses.button} onClick={handleRun}>Run</Button>}
                                <div style={{ whiteSpace: 'break-spaces', minHeight: window.innerHeight/20 }}>
                                    <p></p>
                                </div>
                                <Typography className={itemClasses.smallHeading}>
                                    DOWNLOADING
                                </Typography>
                                <Collapse in={openField}>
                                    <p></p>
                                    <ThemeProvider theme={textTheme}>
                                        <TextField 
                                        InputProps={{ classes: inputBaseStyles, disableUnderline: true }}
                                        placeholder={'filename'}
                                        value={newFileName}
                                        onChange={handleFileNameChange}
                                        variant="outlined"
                                        />
                                    </ThemeProvider>
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
                                            height: window.innerHeight/1.24,
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
                                            width={window.innerWidth/1.65}
                                            height={window.innerHeight/1.7}
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
                                <p></p>
                                <div style={{ whiteSpace: 'break-spaces', minHeight: 40 }}>
                                    <p></p>
                                </div>
                                {/* <Button className={itemClasses.clearButton} onClick={handleClear} disableElevation variant="outlined">Clear All</Button> */}
                            </div>
                        </GridList>
                    </Card>
                    <span>  </span>
                    <Dropzone className={classes.dropCard} onDrop={handleDrop} accept='.java'>
                        {({getRootProps, getInputProps, isDragActive, isDragReject, isDragAccept, acceptedFiles, rejectedFiles}) => (
                        <section style={{ width: window.innerWidth/2.6, height: window.innerHeight/1.24}}>
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
                                    width={(window.innerWidth/2.6)}
                                    height={window.innerHeight/1.24}
                                    >
                                    </AceEditor>
                                </div>
                                </div>:
                                <div className={classes.dropCardBorder}>
                                <div className='Dropzone2' style={{ width: window.innerWidth/2.6, height: window.innerHeight/1.24 }}>
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
                    <span> </span>
                    {getSecondDisplayText()}
                </div>
            </Paper>
        </div>
    );
}