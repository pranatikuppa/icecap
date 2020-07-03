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

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(4),
      },
    },
    textField: {
        maxWidth: 490,
        minWidth: 490,
        minHeight: 550,
        maxHeight: 550,
        scrollBehavior: 'smooth',
        borderColor: '#6493a1',
    }
}));

export default function EditorPage() {

    const classes2 = useStyles();
    const classes = mainStyles();
    const [uploadedFiles, setUploadedFiles] = React.useState([]);
    const [originalFileTexts, setOriginalFileTexts] = React.useState([]);
    const [textField, setTextField] = React.useState(<TextareaAutosize rowsMin={550} defaultValue={""} className={classes2.textField}></TextareaAutosize>)
    
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

    function handleDrop(acceptedFiles, rejectedFiles) {
        setUploadedFiles(acceptedFiles);
        var texts = [];
        var i;
        for (i = 0; i < uploadedFiles.length; i++) {
            var inputFile = uploadedFiles[i];
            fileAccessMethod(inputFile).then(function(fileText) {
                if (i == 0) {
                    setTextField(<TextareaAutosize rowsMin={550} defaultValue={fileText} className={classes2.textField}></TextareaAutosize>);
                }
                var text = fileText;
                texts.push(text);
            });
        }
        setOriginalFileTexts(texts);
    }

    function indexChange(index) {
        setTextField(<TextareaAutosize rowsMin={550} defaultValue={originalFileTexts[index]} className={classes2.textField}></TextareaAutosize>);
    }

    return(
        <div className={classes.root}>
            <Paper elevation={0} style={{ backgroundColor: '#e3ecef', height: 6*window.screen.height/7, width: window.screen.width}}>
                <FileUploader onUpload={indexChange} displayText={textField} onFileDrop={handleDrop}></FileUploader>
            </Paper>
        </div>
    );
}