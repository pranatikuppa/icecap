import React, { Component } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import StepperPage from './StepperPage';
import ResourcesPage from './ResourcesPage';
import PageHeader from './components/PageHeader';
import MainInfoPage from './MainInfoPage';
import TutorialPage from './TutorialPage';
import EditorPage from './EditorPage';
import { Switch, Typography } from '@material-ui/core';
import { HashRouter as Router, Switch as RouterSwitch, Route} from 'react-router-dom';
import './App.css';

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
      marginLeft: theme.spacing(window.innerWidth/22),
    },
  }));

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

  return(
    <Router>
      <div style={{ minHeight: window.innerHeight, backgroundColor: mainColor}} className="App-body">
        <div style={{ backgroundColor: mainColor, whiteSpace: 'break-spaces'}} className='App-body'>
          <PageHeader iColor={iconHighlight} darkModeCallback={switchDark} hColor={mainColor} mColor={middleColor} bColor={backColor} tColor={textColor}></PageHeader>
          <RouterSwitch>
            <Route 
            exact path="/"
            render={(props) => <MainInfoPage {...props} 
              tColor={textColor}
              logoStyle={logo}
              bColor={backColor}
              mColor={middleColor}
              hColor={mainColor}
            />}
            />
            <Route path="/tutorial"
            render={(props) => <TutorialPage {...props}
              pColor={tutorialColor}
              mColor={middleColor}
              bColor={backColor}
              tColor={textColor}
              hColor={mainColor}
            />}
            />
            <Route path="/live"
            render={(props) => <EditorPage {...props}
              iColor={iconHighlight}
              diffHighlight={diffHighlight}
              eTheme={editorTheme}
              hColor={mainColor}
              mColor={middleColor}
              tColor={textColor}
              bColor={backColor}
            />}
            />
            <Route path="/static" 
            render={(props) => <StepperPage {...props}
              mColor={middleColor}
              tColor={textColor}
              bColor={backColor}
              hColor={mainColor}
            />}
            />
          </RouterSwitch>
        </div>
        <Typography className={classes.text}>created by two fellow 61b'ers: pranati and khushi</Typography>
      </div>
    </Router>
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