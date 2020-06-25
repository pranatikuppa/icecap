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

    const classes = useStyles();

    function handleChange(e) {
        props.callbackFromParent(props.defaultFileName, e.target.value);
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

    function doDownload() {
        download(props.defaultFileName, props.contentList[props.fileIndex]);    
    }

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