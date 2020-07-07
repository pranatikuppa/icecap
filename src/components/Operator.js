import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import React from 'react';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import InputBase from '@material-ui/core/InputBase';
import DialogContent from '@material-ui/core/DialogContent';
import Collapse from '@material-ui/core/Collapse';
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import RmJavadocs from './RmJavadocs';
import SingleLines from './SingleLines';
import MultiLines from './MultiLines';
import Javadocs from './Javadocs';
import Whitespaces from './Whitespaces';
import AceEditor from 'react-ace';
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-katzenmilch";
import { diff as DiffEditor } from "react-ace";
import { DialogContentText } from '@material-ui/core';

const CustomInput = withStyles((theme) => ({
    root: {
        'label + &': {
        color: '#154854',
        marginTop: theme.spacing(2),
        },
    },
    input: {
        minWidth: 150,
        minHeight: 35,
        maxWidth: 700,
        scrollBehavior: 'auto',
        borderRadius: 4,
        position: 'relative',
        backgroundColor: '#e3ecef',
        border: '1px solid #6493a1',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#6493a1',
            color: '#6493a1',
        },
    },
  })) (InputBase);

const CssTextField = withStyles({
    root: {
        maxWidth: 140,
        minWidth: 140,
        maxHeight: 40,
        minHeight: 40,
        '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
                borderColor: '#6493a1',
            },
            color: '#6493a1',
        },
    },
}) (TextField);

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(1),
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
        color: '#e3ecef',
        backgroundColor: '#6493a1',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 170,
    },
    resultCard: {
        width: '500px',
        height: '520px',
        paddingTop: '20px',
        paddingLeft: '20px',
        paddingRight: '15px',
        paddingBottom: '15px',
    },
    textField: {
        maxWidth: 490,
        minWidth: 490,
        minHeight: 510,
        maxHeight: 510,
        borderColor: '#6493a1',
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
    disableButton: {
        backgroundColor: '#808080',
        color: 'white',
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
        '&:hover': {
            backgroundColor: '#808080',
        },
    },
}));

function getStyles(operation, operationNames, theme) {
    return {
        color:
        operationNames.indexOf(operation) === -1
            ? '#154854'
            : '#6493a1',
    };
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
        elevation: 0,
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
        },
    },
};

const operations = [
    'Remove Javadocs', 'Remove // Comments', 
    'Remove /* Comments', 'Add Javadocs', 'Fix Whitespaces'
];

export default function Operator(props) {

    const [chosenOperations, setChosenOperations] = React.useState([]);
    const [fixedText, setFixedText] = React.useState("");
    const classes = useStyles();
    const theme = useTheme();
    const [display, setDisplay] = React.useState("");
    const [filename, setFilename] = React.useState("");
    const [openField, setOpenField] = React.useState(false);
    const [openDiff, setOpenDiff] = React.useState(false);
    const [diffVal, setDiffVal] = React.useState([]);

    const handleChange = (event) => {
        setChosenOperations(event.target.value);
    };

    function handleTextChange(newText) {
        setDisplay(newText);
        setFixedText(newText);
    }

    function validateFilename(name) {
        var otherPattern = new RegExp("\\W");
        if (name.trim() === "" || otherPattern.exec(name)) {
            return filename;
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

    const handleFilenameChange = (event) => {
        setFilename(validateFilename(event.target.value));
    }

    function handleRun() {
        var newText = props.originalText;
        if (chosenOperations.indexOf("Remove Javadocs") !== -1) {
            var rmJava = new RmJavadocs();
            newText = rmJava.removeJavadocs(newText);
        }
        if (chosenOperations.indexOf("Remove // Comments") !== -1) {
            var single = new SingleLines();
            newText = single.removeSingleLines(newText);
        }
        if (chosenOperations.indexOf("Remove /* Comments") !== -1) {
            var multi = new MultiLines();
            newText = multi.removeMultiLines(newText);
        }
        if (chosenOperations.indexOf("Add Javadocs") !== -1) {
            var java = new Javadocs();
            newText = java.addJavadocs(newText);
        }
        if (chosenOperations.indexOf("Fix Whitespaces") !== -1) {
            var whitespace = new Whitespaces();
            newText = whitespace.fixWhitespaces(newText);
        }
        setDisplay(newText);
        setFixedText(newText);
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
        if (filename === "") {
            download(props.fileName, fixedText);
        } else {
            download(filename, fixedText);
        }
    }

    function getDisplayText() {
        if (display === "") {
            return <AceEditor
            mode="java"
            width="510px"
            height="530px"
            theme="katzenmilch"
            onChange={handleTextChange}
            >
            </AceEditor>;
        } else {
            return <AceEditor
            theme="katzenmilch"
            mode="java"
            width="510px"
            height="530px"
            onChange={handleTextChange}
            value={display}
            >
            </AceEditor>;
        }
    }

    function handleDiffOpen() {
        setDiffVal([props.originalText, fixedText]);
        setOpenDiff(true);
    }

    function handleDiffClose() {
        setOpenDiff(false);
    }

    function handleDiffChange(newVal) {
        setDiffVal(newVal);
    }

    return (
        <div className={classes.root} style={{ whiteSpace: 'break-spaces', lineHeight: 8}}>
            <p>
            </p>
            <FormControl className={classes.formControl}>
                <InputLabel shrink htmlFor='operation-selector' id="operation-label">Select Operations</InputLabel>
                <Select
                autoWidth
                defaultValue="Select Operations"
                variant='outlined'
                labelId="operation-label"
                id="operation-chip"
                multiple
                value={chosenOperations}
                onChange={handleChange}
                input={<CustomInput placeholder="Select Operations" />}
                inputProps={{
                    name: 'operation',
                    id: 'operation-selector',
                }}
                renderValue={(selected) => (
                    <div className={classes.chips}>
                    {selected.length !== 0 &&
                    selected.map((value) => (
                        <Chip key={value} label={value} className={classes.chip}></Chip>
                    ))}
                    </div>
                )}
                MenuProps={MenuProps}
                >
                {operations.map((operation) => (
                    <MenuItem key={operation} value={operation} style={getStyles(operation, chosenOperations, theme)}>
                    {operation}
                    </MenuItem>
                ))}
                </Select>
            </FormControl>
            <p>
            </p>
            <div style={{  flexDirection: 'row', display: 'flex'}}>
                {getDisplayText()}
                <span>           </span>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {chosenOperations.length === 0 || props.originalText === "" ? <Button className={classes.disableButton}>Run</Button> :
                    <Button className={classes.button} onClick={handleRun}>Run</Button>}
                    <p>
                    </p>
                    {fixedText !== "" ? <Button className={classes.button} onClick={() => {setOpenField(!openField)}}>{openField ? 'Done' : 'Change Filename'}</Button> :
                    <Button className={classes.disableButton}>Change Filename</Button>}
                    <p>
                    </p>
                    <Collapse in={openField}>
                        <CssTextField 
                        onChange={handleFilenameChange}
                        id="outlined-required"
                        label="Enter filename"
                        variant="outlined">
                        </CssTextField>
                    </Collapse>
                    {fixedText !== "" ? <Button className={classes.button} onClick={handleDownload}>Download File</Button> :
                    <Button className={classes.disableButton}>Download File</Button>}
                    <p>
                    </p>
                    {fixedText !== "" ? <Button className={classes.button} onClick={handleDiffOpen}>View Difference</Button> :
                    <Button className={classes.disableButton}>View Difference</Button>}
                    <Dialog
                        maxWidth='lg'
                        fullWidth
                        PaperProps={{
                            style: {
                                height: 1000,
                            }
                        }}
                        open={openDiff}
                        onClose={handleDiffClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"View the differences in your code below:"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText>The highlighted lines show the differences between your original code (on the left) and the version fixed by ICEcap (on the right).</DialogContentText>
                            <DiffEditor
                            className={'codeMarker'}
                            onChange={handleDiffChange}
                            width="1000px"
                            height="500px"
                            value={diffVal}
                            setOptions={{useWorker: false}}
                            mode="java"
                            theme="katzenmilch"
                            >
                            </DiffEditor>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={handleDiffClose} className={classes.button}>
                            Close
                        </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        </div>
    );
}