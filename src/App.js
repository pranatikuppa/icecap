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
import Paper from '@material-ui/core/Paper';

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

  const [backColor, setBackColor] = React.useState('#e3ecef');
  const [textColor, setTextColor] = React.useState('#154854');
  const [middleColor, setMiddleColor] = React.useState('#6493a1');
  const [editorTheme, setEditorTheme] = React.useState("katzenmilch");
  const [mainColor, setMainColor] = React.useState('#FFFFFF');
  const [tutorialColor, setTutorialColor] = React.useState('#FFFFFF');
  const [logo, setLogo] = React.useState('LightLogo');

  const [isStep, setIsStep] = React.useState(true);

  const mainStyles = makeStyles((theme) => ({
    root: {
      marginLeft: theme.spacing(4),
      color: textColor,
      width: 600,
    },
    paper: {
      margin: theme.spacing(3),
    },
  }));

  function handleSwitch() {
    setIsStep(!isStep);
  }

  const classes = mainStyles();
  
  function switchDark() {
    if (backColor === '#e3ecef') {
      setBackColor('#444d56');
      setTextColor('#e3ecef');
      setMiddleColor('#e3ecef');
      setMainColor('#16161d');
      setTutorialColor('#282C35');
      setLogo('DarkLogo');
      setEditorTheme("nord_dark");
    } else {
      setBackColor('#e3ecef');
      setTextColor('#154854');
      setMiddleColor('#6493a1');
      setMainColor('#FFFFFF');
      setTutorialColor('#FFFFFF');
      setLogo('LightLogo');
      setEditorTheme("katzenmilch");
    }
  }

  return(
    <div style={{ backgroundColor: mainColor }} className='App-body'>
      <PageHeader mColor={middleColor} bColor={backColor} tColor={textColor}></PageHeader>
      <MainInfoPage tColor={textColor} logoStyle={logo} bColor={backColor} mColor={middleColor}></MainInfoPage>
      <TutorialPage pColor={tutorialColor} mColor={middleColor} bColor={backColor} tColor={textColor}></TutorialPage>
      <Paper elevation={0} className={classes.paper} style={{ backgroundColor: backColor }}>
        <Grid component="label" container alignItems="center" style={{ whiteSpace: 'break-spaces' }} className={classes.root}>
          <Grid item>View Settings: </Grid>
          <span>        </span>
          <Grid item>Live</Grid>
          <Grid item>
            <CustomSwitch
            onChange={handleSwitch}
            ></CustomSwitch>
          </Grid>
          <Grid item>Static</Grid>
          <span>                </span>
          <Grid item>Default</Grid>
          <Grid item>
            <CustomSwitch
            onChange={switchDark}
            ></CustomSwitch>
          </Grid>
          <Grid item>Dark Mode</Grid>
        </Grid>
      </Paper>
      {!isStep ? 
      <StepperPage mColor={middleColor} tColor={textColor} bColor={backColor}></StepperPage> :
      <EditorPage eTheme={editorTheme} mColor={middleColor} tColor={textColor} bColor={backColor}></EditorPage>
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