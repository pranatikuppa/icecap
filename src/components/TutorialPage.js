import React from 'react';
import './Component.css';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { animateScroll as scroll } from "react-scroll";
import { makeStyles } from '@material-ui/core';

const mainStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
          margin: theme.spacing(4),
          width: theme.spacing(window.screen.width),
          height: theme.spacing(window.screen.height),
        },
    },
}));

export default function TutorialPage() {

    const classes = mainStyles();

    return(
        <div className={classes.root}>
            <Paper elevation={0} style={{ backgroundColor: '#e3ecef', height: 4*window.screen.height/5, width: window.screen.width }}>
                This is the tutorial page.
            </Paper>
        </div>
    );
}