import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dropzone from 'react-dropzone';
import Card from '@material-ui/core/Card';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { Icon } from '@material-ui/core';

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
  },
  dropCard: {
    padding: '20px',
    width: '200px',
    height: '100px',
  }
}));

// function onDrop(acceptedFiles, rejectedFiles) {
//   // do stuff with files…
//  }

export default function UploadButtons() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Card elevation={0} className={classes.dropCard}>
        <Dropzone className={classes.dropCard} onDrop={acceptedFiles => console.log(acceptedFiles)}>
          {({getRootProps, getInputProps}) => (
            <section>
              <div className='Dropzone' {...getRootProps()}>
                <input {...getInputProps()} />
                <p style={{ color: '#6493a1', whiteSpace: 'break-spaces' }}>Drop file here</p>
              </div>
            </section>
          )}
        </Dropzone>
      </Card>
      <p>

      </p>
      <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
      />
      <label htmlFor="contained-button-file">
        <Button component="span"
        className={classes.button}
        disableElevation
        variant='contained'
        >
          Upload
        </Button>
      </label>
    </div>
  );
}
