import Paper from '@material-ui/core/Paper';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FileUploader from './FileUploader';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

const mainStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(4),
        width: theme.spacing(window.screen.width),
        height: theme.spacing(window.screen.height),
      },
    },
}));

export default function EditorPage() {

    const classes = mainStyles();

    return(
        <div className={classes.root}>
            <Paper elevation={0} style={{ backgroundColor: '#e3ecef', height: 7*window.screen.height/8, width: window.screen.width}}>
                <FileUploader></FileUploader>
            </Paper>
        </div>
    );
}