import React from 'react';
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
      margin: theme.spacing(1),
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
    width: '790px',
    height: '160px',
    paddingTop: '20px',
    paddingLeft: '20px',
    paddingRight: '15px',
    paddingBottom: '15px',
  },
  dropCardBorder: {
    border: 'dashed',
    borderColor: '#6493a1',
    borderWidth: '2px',
    width: '780px',
    height: '150px',
  },
  defaultCardBorder: {
    border: 'dashed',
    borderColor: '#D3D3D3',
    borderWidth: '2px',
    width: '780px',
    height: '150px',
  },
  listCard: {
    color: '#154854',
    width: '200px',
    backgroundColor: 'white',
    padding: '10px',
    alignContent: 'center',
  },
  icon: {
    color: '#6493a1'
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

  /**
   * The components that make up the Upload Button.
   */
  return (
    <div className={classes.root}>
      <Card elevation={0} className={classes.dropCard}>
        <Dropzone className={classes.dropCard} onDrop={props.onFileDropped} accept='.java'>
          {({getRootProps, getInputProps, isDragActive, isDragReject, isDragAccept, acceptedFiles, rejectedFiles}) => (
            <section style={{ width: 150, height: 780 }}>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                {!isDragActive ? 
                  <div className={classes.defaultCardBorder}>
                    <div className='Dropzone'>
                    <p></p>
                    <CloudUploadIcon className={classes.icon} fontSize='large'></CloudUploadIcon>
                    <p style={{ color: '#6493a1', whiteSpace: 'break-spaces' }}>Choose files or drop them here</p>
                    <p></p>
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
            props.onFileDropped(fileList, []);
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
