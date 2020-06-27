import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const CssTextField = withStyles({
    root: {
        '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
                borderColor: '#6493a1',
            },
            color: '#6493a1',
        },
    },
}) (TextField);

const useStyles = makeStyles((theme) => ({
    button: {
        backgroundColor: '#6493a1',
        '&:hover': {
          backgroundColor: '#537b86',
        },
        color: 'white',
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
}));

export default function(props) {

    /**
     * The styles and states of the FileDownloadComponent that
     * needs to be kept track of.
     */
    const classes = useStyles();
    const [currentFileName, setCurrentFileName] = React.useState(props.defaultFileName);

    /**
     * Helper function that takes in a filename
     * and validates and cleans it, returning a valid
     * filename based on the input.
     * @param {String} filename the inputted filename.
     */
    function validateFilename(filename) {
        var otherPattern = new RegExp("\\W");
        if (filename.trim() === "" || otherPattern.exec(filename)) {
            return currentFileName;
        } else {
            filename = filename.replace(" ", "_");
            if (!filename.includes(".") && !filename.includes(".java")) {
                return filename + ".java";
            } else if (filename.includes(".")) {
                var dotIndex = filename.indexOf(".", 0);
                return filename.substring(0, dotIndex) + ".java";
            } else {
                return filename;
            }
        }
    }

    /**
     * The handler method that handles a change to
     * the text field.
     * @param {Object} e the event object that the text field returns. 
     */
    function handleChange(e) {
        var newUnfilteredName = e.target.value;
        var newFilteredName = validateFilename(newUnfilteredName);
        props.callbackFromParent(currentFileName, newFilteredName);
        setCurrentFileName(newFilteredName);
    }

    /**
     * Helper method that performs a download when called
     * using the filename and the content passed in.
     * @param {String} filename the name of the file.
     * @param {String} text the content that the file will contain once downloaded.
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
     * The handler method that performs the download using the 
     * appropriate variables.
     */
    function doDownload() {
        download(currentFileName, props.contentList[props.fileIndex]);    
    }

    /**
     * The components that make up the FileDownloadComponent.
     */
    return (
        <div className='DownloadTextField' style={{ whiteSpace: 'break-spaces', lineHeight: 4.5 }}>
            <CssTextField 
            onChange={handleChange}
            required
            id="outlined-required"
            defaultValue={props.defaultFileName}
            variant="outlined">
            </CssTextField>
            <span>        </span> 
            <Button
            onClick={doDownload}
            variant='contained'
            className={classes.button}
            disableElevation
            >
                Download File
            </Button>
        </div>
    );
}