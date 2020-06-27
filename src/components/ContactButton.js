import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

/**
 * Styles to apply to the app bar elements of the page.
 */
const appBarStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
      color: '#6493a1',
    },
    button: {
      color: '#6493a1',
      borderColor: '#6493a1',
    }
}));

/**
 * The ContactButton component created to open a dialog 
 * within the application for the user to interact with.
 */
export default function ContactButton() {
    /**
     * Styles and necessary states of the button
     * to keep track of.
     */
    const classes = appBarStyles();
    const [open, setOpen] = React.useState(false);
  
    /**
     * The handler method that handles when the button
     * is clicked to open.
     */
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    /**
     * The handler method that handles when the button 
     * is clicked to close.
     */
    const handleClose = () => {
      setOpen(false);
    };
  
    /**
     * The components that make up the ContactButton.
     */
    return (
      <div>
        <Button variant="outlined" className={classes.button} onClick={handleClickOpen}>
          Contact Us
        </Button>
        <Dialog
          open={open}
          keepMounted
          disableBackdropClick
          disableEscapeKeyDown
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">{"Contact Us"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Let us know if you had issues using ICEcap, if you have suggestions or feedback, or if you would 
              like to get in touch!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} className={classes.button}>
              Cancel
            </Button>
            <Button onClick={handleClose} className={classes.button}>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }