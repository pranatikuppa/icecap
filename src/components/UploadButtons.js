import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';
import Dropzone from 'react-dropzone';

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
}));

// function onDrop(acceptedFiles, rejectedFiles) {
//   // do stuff with files…
//  }

export default function UploadButtons() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
        {({getRootProps, getInputProps}) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
          </section>
        )}
      </Dropzone>
    </div>
  );
}
