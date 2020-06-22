import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dropzone from 'react-dropzone';
import Card from '@material-ui/core/Card';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { Icon, Paper } from '@material-ui/core';
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';
import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';

var inputFiles = {};
var rejectFiles = {};

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
    width: '790px',
    height: '130px',
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
    height: '120px',
  },
  defaultCardBorder: {
    border: 'dashed',
    borderColor: '#D3D3D3',
    borderWidth: '2px',
    width: '780px',
    height: '120px',
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

export default function UploadButtons(props) {
  const classes = useStyles();
  const [acceptedOpen, setAcceptedOpen] = React.useState(false);
  const [rejectedOpen, setRejectedOpen] = React.useState(false);

  function onFileDrop(acceptedFiles, rejectedFiles) {
    inputFiles = acceptedFiles;
    rejectFiles = rejectedFiles;
    if (inputFiles.length <= 0) {
      setAcceptedOpen(false);
    } else {
      setAcceptedOpen(true);
    }
    if (rejectFiles.length <= 0) {
      setRejectedOpen(false);
    } else {
      setRejectedOpen(true);
    }
    props.callbackFromParent(acceptedFiles);
  }

  function getFileList(list) {
    var fullString = "";
    for (var item in list) {
      fullString += list[item].name + ", ";
    }
    fullString = fullString.substring(0, fullString.length - 2);
    return fullString;
  }

  function getRejectFileList(num) {
    var fullString = "";
    return fullString + num + " file was not uploaded due to incorrect format";
  }

  return (
    <div className={classes.root}>
      <Card elevation={0} className={classes.dropCard}>
        <Dropzone className={classes.dropCard} onDrop={onFileDrop} accept='.java'>
          {({getRootProps, getInputProps, isDragActive, isDragReject, isDragAccept, acceptedFiles, rejectedFiles}) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                {!isDragActive ? 
                  <div className={classes.defaultCardBorder}>
                    <div className='Dropzone'>
                    <p></p>
                    <CloudUploadIcon className={classes.icon} fontSize='large'></CloudUploadIcon>
                    <p style={{ color: '#6493a1', whiteSpace: 'break-spaces' }}>Choose a file or drop it here</p>
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
      <Collapse in={acceptedOpen}>
        <Alert width='100px'>
          {getFileList(inputFiles)}
        </Alert>
      </Collapse>
      <Collapse in={rejectedOpen}>
        <Alert width='100px' severity="error">
          {getRejectFileList(rejectFiles.length)}
        </Alert>
      </Collapse>
    </div>
  );
}
