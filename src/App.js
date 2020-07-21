import React, { Component } from 'react';
import './App.css';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import StepperPage from './components/StepperPage';
import ResourcesPage from './components/ResourcesPage';
import PageHeader from './components/PageHeader';
import MainInfoPage from './components/MainInfoPage';
import TutorialPage from './components/TutorialPage';
import EditorPage from './components/EditorPage';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';

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

const HOME = 0;
const LIVE = 1;
const STATIC = 2;
const TUTORIAL = 3;
const RESOURCES = 4;

function MainApp() {

  const [backColor, setBackColor] = React.useState('#e3ecef');
  const [textColor, setTextColor] = React.useState('#154854');
  const [middleColor, setMiddleColor] = React.useState('#6493a1');
  const [editorTheme, setEditorTheme] = React.useState("katzenmilch");
  const [mainColor, setMainColor] = React.useState('#FFFFFF');
  const [tutorialColor, setTutorialColor] = React.useState('#FFFFFF');
  const [logo, setLogo] = React.useState('LightLogo');
  const [diffHighlight, setDiffHighlight] = React.useState('codeMarkerLight');
  const [iconHighlight, setIconHighlight] = React.useState('#D3D3D3');
  const [screenNum, setScreenNum] = React.useState(HOME);

  const mainStyles = makeStyles((theme) => ({
    root: {
      marginLeft: theme.spacing(4),
      color: textColor,
      width: 600,
    },
    paper: {
      margin: theme.spacing(3),
      padding: theme.spacing(1),
    },
    text: {
      fontFamily: 'Open-Sans',
      color: '#7E7E7E',
      margin: theme.spacing(3),
      marginLeft: theme.spacing(window.screen.width/22),
    },
  }));

  function changeScreen(sNum) {
    setScreenNum(sNum);
  }

  const classes = mainStyles();
  
  function switchDark(isDarkMode) {
    if (isDarkMode) {
      setIconHighlight('#696969');
      setBackColor('#444d56');
      setTextColor('#e3ecef');
      setMiddleColor('#e3ecef');
      setMainColor('#16161d');
      setTutorialColor('#282C35');
      setLogo('DarkLogo');
      setEditorTheme("nord_dark");
      setDiffHighlight('codeMarkerDark');
    } else {
      setIconHighlight('#D3D3D3');
      setBackColor('#e3ecef');
      setTextColor('#154854');
      setMiddleColor('#6493a1');
      setMainColor('#FFFFFF');
      setTutorialColor('#FFFFFF');
      setLogo('LightLogo');
      setEditorTheme("katzenmilch");
      setDiffHighlight('codeMarkerLight');
    }
  }

  function getScreen() {
    switch(screenNum) {
      case HOME:
        return <MainInfoPage screenChangeCallback={changeScreen} tColor={textColor} logoStyle={logo} bColor={backColor} mColor={middleColor}></MainInfoPage>;
      case LIVE:
        return <EditorPage screenChangeCallback={changeScreen} diffHighlight={diffHighlight} eTheme={editorTheme} hColor={mainColor} mColor={middleColor} tColor={textColor} bColor={backColor}></EditorPage>;
      case STATIC:
        return <StepperPage screenChangeCallback={changeScreen} mColor={middleColor} tColor={textColor} bColor={backColor}></StepperPage>;
      case TUTORIAL:
        return <TutorialPage screenChangeCallback={changeScreen} pColor={tutorialColor} mColor={middleColor} bColor={backColor} tColor={textColor}></TutorialPage>;
      // case RESOURCES:
      //   return <ResourcesPage screenChangeCallback={changeScreen} tColor={textColor} logoStyle={logo} bColor={backColor} mColor={middleColor}></ResourcesPage>;
      default:
        return <MainInfoPage screenChangeCallback={changeScreen} tColor={textColor} logoStyle={logo} bColor={backColor} mColor={middleColor}></MainInfoPage>;
    }
  }

  return(
    <div style={{ minHeight: window.screen.height, backgroundColor: mainColor}} className="App-body">
      <div style={{ backgroundColor: mainColor, whiteSpace: 'break-spaces'}} className='App-body'>
        <PageHeader iColor={iconHighlight} currentScreen={screenNum} darkModeCallback={switchDark} screenChangeCallback={changeScreen} hColor={mainColor} mColor={middleColor} bColor={backColor} tColor={textColor}></PageHeader>
        {getScreen()}
      </div>
      <Typography className={classes.text}>created by two fellow 61b'ers: pranati and khushi</Typography>
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