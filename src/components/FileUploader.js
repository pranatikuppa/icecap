import React from 'react';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Dropzone from 'react-dropzone';
import Card from '@material-ui/core/Card';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import './Component.css';
import { Button } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import InputBase from '@material-ui/core/InputBase';
import Collapse from '@material-ui/core/Collapse';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(3),
    },
  },
  input: {
    display: 'none',
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
  dropCard: {
    width: '500px',
    height: '520px',
    paddingTop: '20px',
    paddingLeft: '20px',
    paddingRight: '15px',
    paddingBottom: '15px',
  },
  dropCardBorder: {
    border: 'dashed',
    borderColor: '#D3D3D3',
    borderWidth: '2px',
    width: '490px',
    height: '510px',
  },
  defaultCardBorder: {
    border: 'dashed',
    borderColor: 'white',
    borderWidth: '2px',
    width: '490px',
    height: '510px',
  },
  icon: {
    color: '#6493a1'
  },
  textField: {
      maxWidth: 490,
      minWidth: 490,
      minHeight: 510,
      maxHeight: 510,
      borderColor: '#6493a1',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  }
}));

const CustomInput = withStyles((theme) => ({
  root: {
    'label + &': {
      color: '#154854',
      marginTop: theme.spacing(2),
    },
  },
  input: {
    borderRadius: 4,
    backgroundColor: '#e3ecef',
    border: '1px solid #6493a1',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    '&:focus': {
      borderRadius: 4,
      borderColor: '#6493a1',
      color: '#154854',
    },
  },
})) (InputBase);

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

export default function FileUploader(props) {

  const classes = useStyles();
  const [index, setIndex] = React.useState(0);
  const [uploadedFiles, setUploadedFiles] = React.useState([]);
  const [fileTextList, setFileTextList] = React.useState([]);
  const [isEditing, setIsEditing] = React.useState(true);
  const [display, setDisplay] = React.useState("");
  const [inputText, setInputText] = React.useState("");
  const [openSave, setOpenSave] = React.useState(false);
  const [openInfo, setOpenInfo] = React.useState(false);

  const handleEdit = (event) => {
    setOpenSave(false);
    setIsEditing(!isEditing);
  };

  const handleChange = (event) => {
    if (uploadedFiles.length !== 0) {
      if (!isEditing) {
        setIndex(event.target.value);
        props.callback(fileTextList[event.target.value]);
      } else {
        setOpenSave(true);
      }
    }
  };

  const handleTextChange = (event) => {
    var newText = event.target.value;
    if (fileTextList.length > 0) {
      var oldText = fileTextList[index];
      var changedFileTextList = fileTextList.map(function(filetext){return (filetext === oldText ? newText : filetext)});
      setFileTextList(changedFileTextList);
      props.callback(changedFileTextList[index]);
    } else {
      setInputText(newText);
      props.callback(newText);
    }
  };

  function getDisplayText() {
    if (!isEditing) {
      var inputFile = uploadedFiles[index];
      fileAccessMethod(inputFile).then(function(fileText) {
        if (fileText === fileTextList[index]) {
          setDisplay(fileText);
          props.callback(fileText);
        } else {
          setDisplay(fileTextList[index]);
        }
      });
      return <TextareaAutosize 
      rowsMin={550} 
      className={classes.textField}
      value={display}
      >
      </TextareaAutosize>;
    } else {
      return <TextareaAutosize onChange={handleTextChange} rowsMin={550} className={classes.textField}></TextareaAutosize>;
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

  function handleDrop(acceptedFiles) {
    setOpenInfo(true);
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
    setIsEditing(false);
    setInputText("");
  }

  function getOptions() {
    if (uploadedFiles.length === 0) {
      return <MenuItem value="">None</MenuItem>;
    } else {
      var options = [];
      var i;
      for (i = 0; i < uploadedFiles.length; i++) {
        options.push(<MenuItem value={i}>{uploadedFiles[i].name}</MenuItem>)
      }
      return options;
    }
  }

  return (
    <div className={classes.root}>
      <p>

      </p>
      <div style={{ whiteSpace: 'break-spaces', lineHeight: 4.5 }}>
        <input
          accept=".java"
          className={classes.input}
          id="contained-button-file"
          multiple
          type="file"
        />
        <label htmlFor="contained-button-file">
          <Button 
          variant="contained" 
          component="span"
          className={classes.button}
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
        <span>            </span>
        <FormControl className={classes.formControl}>
          <InputLabel shrink htmlFor="file-selector">Select a file</InputLabel>
          <Select
            value={index}
            onChange={handleChange}
            label="File"
            input={<CustomInput />}
            inputProps={{
              name: 'file',
              id: 'file-selector',
            }}
            MenuProps={MenuProps}
          >
            {getOptions()}
          </Select>
        </FormControl>
        <span>            </span>
        {fileTextList.length === 0 || inputText !== "" ?
        <Button 
        variant="contained" 
        component="span"
        className={classes.disableButton}
        disableElevation
        disable
        >
          Edit Text
        </Button> :
        <Button 
        variant="contained" 
        component="span"
        className={classes.button}
        disableElevation
        onClick={handleEdit}
        >
          {isEditing ? 'Save Text' : 'Edit Text'}
        </Button>
        }
      </div>
      <Collapse in={openSave}>
        <Alert variant="outlined" severity="error">
          Please click the 'Save Text' button before you switch to a different file.
        </Alert>
      </Collapse>
      <Collapse in={openInfo}>
        <Alert variant="outlined" severity="info" 
        action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpenInfo(false);
              }}
            >
              <Close fontSize="inherit" />
            </IconButton>}>
          Use the 'Edit Text' button in the top right to edit the file content displayed.
        </Alert>
      </Collapse>
      <Card elevation={0} className={classes.dropCard}>
        <Dropzone className={classes.dropCard} onDrop={handleDrop} accept='.java'>
          {({getRootProps, getInputProps, isDragActive, isDragReject, isDragAccept, acceptedFiles, rejectedFiles}) => (
            <section style={{ width: 150, height: 490 }}>
              <div {...getRootProps({onClick: event => event.stopPropagation()})}>
                <input {...getInputProps()} />
                {!isDragActive ? 
                  <div className={classes.defaultCardBorder}>
                    <div className='Dropzone2'>
                      {getDisplayText()}
                    </div>
                  </div>:
                  <div className={classes.dropCardBorder}>
                    <div className='Dropzone2'>
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
      </Card>
    </div>
  );
}
