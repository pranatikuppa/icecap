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

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(4),
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
  dropCard: {
    width: '500px',
    height: '560px',
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
    height: '550px',
  },
  defaultCardBorder: {
    border: 'dashed',
    borderColor: 'white',
    borderWidth: '2px',
    width: '490px',
    height: '550px',
  },
  icon: {
    color: '#6493a1'
  },
  textField: {
      maxWidth: 490,
      minWidth: 490,
      minHeight: 550,
      maxHeight: 550,
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
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
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

export default function FileUploader(props) {

  const classes = useStyles();
  const [index, setIndex] = React.useState(0);
  const [uploadedFiles, setUploadedFiles] = React.useState([]);
  const [fileTextList, setFileTextList] = React.useState([]);
  const [display, setDisplay] = React.useState("");

  const handleChange = (event) => {
    setIndex(event.target.value);
  };

  function getDisplayText() {
    if (uploadedFiles.length > 0) {
      var inputFile = uploadedFiles[index];
      fileAccessMethod(inputFile).then(function(fileText) {
          var text = fileText;
          setDisplay(fileText);
      });
      return <TextareaAutosize 
      rowsMin={550} 
      className={classes.textField}
      defaultValue={display}
      >
      </TextareaAutosize>;
    } else {
      return <TextareaAutosize rowsMin={550} className={classes.textField}></TextareaAutosize>;
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

  function handleDrop(acceptedFiles, rejectedFiles) {
    setUploadedFiles(acceptedFiles);
  }

  function getOptions() {
    if (uploadedFiles.length < 0) {
      return <option aria-label='None' value=""></option>;
    } else {
      var options = [];
      var i;
      for (i = 0; i < uploadedFiles.length; i++) {
        options.push(<option value={i}>{uploadedFiles[i].name}</option>)
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
          <InputLabel shrink htmlFor="outlined-age-native-simple">Select a file</InputLabel>
          <Select
            native
            value={index}
            onChange={handleChange}
            label="Age"
            input={<CustomInput />}
            inputProps={{
              name: 'age',
              id: 'outlined-age-native-simple',
            }}
          >
            {getOptions()}
          </Select>
        </FormControl>
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
