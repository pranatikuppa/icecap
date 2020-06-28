import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ContactButton from './ContactButton';
import './Component.css';

/**
 * The styles that are used to customize the page header.
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
    }
}));
  
/**
 * The PageHeader component.
 */
export default function PageHeader() {
    /**
     * The styles that are used for the components below.
     */
    const classes = appBarStyles();
    
    /**
     * The components that make up the PageHeader.
     */
    return (
        <div className={classes.root}>
        <AppBar elevation={0} position="static" color='inherit'>
            <Toolbar>
            <Typography variant="App-header" className={classes.title}>
                ICEcΔp v1.0
            </Typography>
            <Button className={classes.button} variant="App-header" target="_blank" href="https://docs.google.com/forms/d/1A8qwG5T8pZIKmCaPYYSiEoqgzKsWMKBYmpUAqJ4zWw0/prefill" color="inherit">contact us</Button>
            {/* <ContactButton></ContactButton> */}
            </Toolbar>
        </AppBar>
        </div>
    );
  }