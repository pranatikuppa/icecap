import React from 'react';
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
import Typography from '@material-ui/core/Typography';
import AceEditor from 'react-ace';
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-katzenmilch";
import "ace-builds/src-noconflict/theme-nord_dark";

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

export default function FileUploader(props) {

  const CustomInput = withStyles((theme) => ({
    root: {
      'label + &': {
        color: props.tColor,
        marginTop: theme.spacing(2),
      },
    },
    input: {
      borderRadius: 4,
      backgroundColor: props.bColor,
      border: '1px solid',
      borderColor: props.mColor, 
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      '&:focus': {
        borderRadius: 4,
        borderColor: props.mColor,
        color: props.tColor,
      },
    },
  })) (InputBase);

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
      backgroundColor: props.mColor,
      color: props.bColor,
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
      backgroundColor: props.bColor,
      width: '520px',
      height: '530px',
      paddingTop: '20px',
      paddingLeft: '20px',
      paddingRight: '15px',
      paddingBottom: '15px',
    },
    dropCardBorder: {
      border: 'dashed',
      borderColor: '#6493a1',
      borderWidth: '2px',
      width: '510px',
      height: '530px',
    },
    defaultCardBorder: {
      border: 'dashed',
      borderColor: props.bColor,
      borderWidth: '2px',
      width: '510px',
      height: '530px',
    },
    icon: {
      color: '#6493a1',
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  }));

  const classes = useStyles();
  const [index, setIndex] = React.useState(0);
  const [uploadedFiles, setUploadedFiles] = React.useState([]);
  const [fileTextList, setFileTextList] = React.useState([]);
  const [display, setDisplay] = React.useState("");
  const [inputText, setInputText] = React.useState("");

  const handleChange = (event) => {
    if (uploadedFiles.length !== 0) {
      setIndex(event.target.value);
      props.callback(fileTextList[event.target.value]);
      props.callbackFilename(uploadedFiles[event.target.value].name);
    }
  };

  function handleTextChange(newText) {
    if (fileTextList.length > 0) {
      var oldText = fileTextList[index];
      var changedFileTextList = fileTextList.map(function(filetext){return (filetext === oldText ? newText : filetext)});
      setFileTextList(changedFileTextList);
      props.callback(changedFileTextList[index]);
      props.callbackFilename(uploadedFiles[index].name);
    } else {
      setInputText(newText);
      props.callback(newText);
      props.callbackFilename("File1.java");
    }
  };

  function getDisplayText() {
    if (uploadedFiles.length !== 0) {
      var inputFile = uploadedFiles[index];
      fileAccessMethod(inputFile).then(function(fileText) {
        if (fileText === fileTextList[index]) {
          setDisplay(fileText);
          props.callback(fileText);
          props.callbackFilename(uploadedFiles[index].name)
        } else {
          setDisplay(fileTextList[index]);
        }
      });
      return <AceEditor
      theme={props.eTheme}
      width="510px"
      height="530px"
      value={display}
      onChange={handleTextChange}
      mode="java"
      >
      </AceEditor>;
    } else {
      return <AceEditor
      mode="java"
      width="510px"
      height="530px"
      theme={props.eTheme}
      value={display}
      onChange={handleTextChange}
      >
      </AceEditor>;
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
    <div className={classes.root} style={{ whiteSpace: 'break-spaces', lineHeight: 4.7}}>
        <div style={{ display: 'flex', flexDirection: 'row', flex: 1, }}>
          <span>      </span>
          <div>
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
          </div>
          <span>           </span>
          <div style={{ lineHeight: 6.2, whiteSpace: 'break-spaces'}}>
            <FormControl className={classes.formControl}>
              <InputLabel style={{ color: props.tColor }} shrink htmlFor="file-selector">Select a file</InputLabel>
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
          </div>
        </div>
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
