import React from 'react';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { makeStyles } from '@material-ui/core/styles';
import Dropzone from 'react-dropzone';
import Card from '@material-ui/core/Card';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import './Component.css';
import { Button } from '@material-ui/core';

/**
 * Styles used to customize the upload button and 
 * the file dropzone for upload.
 */
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
  }
}));

/**
 * The upload button component that contains both the upload button
 * and the file dropzone. The component collects and returns back 
 * to the parent the accepted and rejected files.
 * @param {Object} props the props used to pull information from the parent.
 */
export default function UploadButtons(props) {
  const classes = useStyles();
  const [uploadedContent, setUploadedContent] = React.useState();
  const [filesToDisplay, setFilesToDisplay] = React.useState();
  const [fileTextList, setFileTextList] = React.useState();

  function handleDrop(acceptFiles, rejectFiles) {
      setFilesToDisplay(filesToDisplay);
      var fileTexts = [];

      props.onFileDropped(acceptFiles, rejectFiles);
  }

  /**
   * The components that make up the Upload Button.
   */
  return (
    <div className={classes.root}>
      <Card elevation={0} className={classes.dropCard}>
        <Dropzone className={classes.dropCard} onDrop={handleDrop} accept='.java'>
          {({getRootProps, getInputProps, isDragActive, isDragReject, isDragAccept, acceptedFiles, rejectedFiles}) => (
            <section style={{ width: 150, height: 490 }}>
              <div {...getRootProps({onClick: event => event.stopPropagation()})}>
                <input {...getInputProps()} />
                {!isDragActive ? 
                  <div className={classes.defaultCardBorder}>
                    <div className='Dropzone2'>
                        <TextareaAutosize
                            className={classes.textField}
                            defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                ut labore et dolore magna aliqua."
                        />
                    </div>
                  </div>:
                  <div className={classes.dropCardBorder}>
                    <div className='Dropzone'>
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
      <p>

      </p>
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
    </div>
  );
}
