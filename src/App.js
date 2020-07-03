import React, { Component } from 'react';
import './App.css';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import StepperPage from './components/StepperPage';
import PageHeader from './components/PageHeader';
import MainInfoPage from './components/MainInfoPage';
import TutorialPage from './components/TutorialPage';
import EditorPage from './components/EditorPage';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';

const mainStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginLeft: theme.spacing(4),
    },
    color: '#154854',
  },
}));

const CustomSwitch = withStyles({
  switchBase: {
    color: '#6493a1',
    '&$checked': {
      color: '#6493a1',
    },
    '&$checked + $track': {
      backgroundColor: '#6493a1',
    },
  },
  checked: {},
  track: {},
}) (Switch);

function MainApp() {

  const classes = mainStyles();
  const [isStep, setIsStep] = React.useState(true);

  function handleSwitch() {
    setIsStep(!isStep);
  }

  return(
    <div className='App-body'>
      <PageHeader></PageHeader>
      <MainInfoPage></MainInfoPage>
      <TutorialPage></TutorialPage>
      <Grid component="label" container alignItems="center" spacing={1} className={classes.root}>
        <Grid item>Stepper Wizard</Grid>
        <Grid item>
          <CustomSwitch
          onChange={handleSwitch}
          ></CustomSwitch>
        </Grid>
        <Grid item>Live Editor</Grid>
      </Grid>
      {isStep ? 
      <StepperPage></StepperPage> :
      <EditorPage></EditorPage>
      }
    </div>
  );
}

/**
 * The main App for ICEcap. The component consists of the
 * PageHeader, the MainInfoPage and the StepperPage.
 */
class App extends Component {

  render() {
    return (
      <MainApp></MainApp>
    );
  }
}

export default App;