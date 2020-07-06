import Paper from '@material-ui/core/Paper';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FileUploader from './FileUploader';
import Operator from './Operator';

const mainStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(4),
        width: theme.spacing(window.screen.width),
        height: theme.spacing(window.screen.height),
      },
    },
    editorDiv: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
    }
}));

export default function EditorPage() {

    const classes = mainStyles();
    const [inputText, setInputText] = React.useState("");

    function inputCallback(text) {
        setInputText(text);
    }

    return(
        <div className={classes.root}>
            <Paper elevation={0} style={{ backgroundColor: '#e3ecef', height: 10*window.screen.height/11, width: window.screen.width}}>
                <div className={classes.editorDiv}>
                <FileUploader callback={inputCallback}></FileUploader>
                <span>        </span>
                <Operator originalText={inputText}></Operator>
                </div>
            </Paper>
        </div>
    );
}