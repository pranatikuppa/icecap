import Paper from '@material-ui/core/Paper';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FileUploader from './FileUploader';
import Operator from './Operator';
import { Typography } from '@material-ui/core';

const mainStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(3),
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
        color: '#154854',
        fontSize: '17px',
        fontWeight: 400,
        fontFamily: 'Open-Sans',
    },
    paper: {
        '& > *': {
            margin: theme.spacing(3),
        },
    }
}));

export default function EditorPage() {

    const classes = mainStyles();
    const [inputText, setInputText] = React.useState("");
    const [filename, setFilename] = React.useState("File1.java");

    function inputCallback(text) {
        setInputText(text);
    }

    function filenameCallback(name) {
        setFilename(name);
    }

    return(
        <div className={classes.root}>
            <Paper className={classes.paper} elevation={0} style={{ backgroundColor: '#e3ecef', height: window.screen.height, width: window.screen.width}}>
            <Typography className={classes.subText}>Upload files with the button or by dragging and dropping, or directly copy and paste your code in the textbox below. 
            Choose 1 or more operations using the selector and click run. You can change the file name and edit the fixed code before downloading. Using the "View Difference" button
             you can see highlighted differences between your original file and the fixed file.
            </Typography>
                <div className={classes.editorDiv}>
                <FileUploader callback={inputCallback} callbackFilename={filenameCallback}></FileUploader>
                <Operator callback={inputCallback} originalText={inputText} fileName={filename}></Operator>
                </div>
            </Paper>
        </div>
    );
}