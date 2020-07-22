import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import './Component.css';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import Switch from '@material-ui/core/Switch';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import { useN02SwitchStyles } from '@mui-treasury/styles/switch/n02';
import CodeIcon from '@material-ui/icons/Code';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
  
/**
 * The PageHeader component.
 */
export default function PageHeader(props) {

  /**
   * Page navigation codes used to navigate between pages.
   */
  const HOME = 0;
  const LIVE = 1;
  const STATIC = 2;
  const TUTORIAL = 3;
  const RESOURCES = 4;

  /**
   * The state variables, anchors and styles used by the header 
   * components.
   */
  const [darkToggle, setDarkToggle] = React.useState(false);
  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const [editorOpen, setEditorOpen] = React.useState(false);
  const settingsAnchorRef = React.useRef(null);
  const editorAnchorRef = React.useRef(null);
  const switchStyles = useN02SwitchStyles();

  /**
   * The styles that are used to customize the page header.
   */
  const appBarStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    bar: {
      backgroundColor: props.hColor
    },
    menuText: {
      fontFamily: 'Open-Sans',
      fontWeight: 600,
      color: props.tColor,
    },
    title: {
      flexGrow: 1,
      color: props.mColor,
    },
    button: {
      fontFamily: 'Open-Sans',
      fontWeight: 600,
      color: props.tColor,
    },
    menuClasses: {
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "left"
      },
      transformOrigin: {
        vertical: "top",
        horizontal: "left"
      },
    },
    switch: {
      color: props.mColor,
    },
  }));

  /**
   * The styles that are used for the components below.
   */
  const classes = appBarStyles();

  /**
   * Handles the state change when the dark mode toggle
   * is changed.
   * @param {any} event the event.
   */
  const handleDarkToggle = (event) => {
    setDarkToggle(event.target.checked);
    props.darkModeCallback(event.target.checked);
  }

  /**
   * Nagivates to the home page.
   */
  const goToHome = () => {
    props.screenChangeCallback(HOME);
  };

  /**
   * Navigates to the tutorial page.
   */
  const goToTutorial = () => {
    props.screenChangeCallback(TUTORIAL);
  };

  /**
   * Navigates to the static page.
   */
  const goToStatic = () => {
    props.screenChangeCallback(STATIC);
  };
  
  /**
   * Navigates to the live page.
   */
  const goToLive = () => {
    props.screenChangeCallback(LIVE);
  };

  /**
   * Navigates to the resources page.
   */
  const goToResources = () => {
    props.screenChangeCallback(RESOURCES);
  };

  /**
   * Handles the state changes and opens the 
   * settings menu.
   */
  const handleSettingsToggle = () => {
    setSettingsOpen((prevSettingsOpen) => !prevSettingsOpen);
  };

  /**
   * Handles the state changes and closes the settings menu.
   * @param {any} event the event.
   */
  const handleSettingsClose = (event) => {
    if (settingsAnchorRef.current && settingsAnchorRef.current.contains(event.target)) {
      return;
    }

    setSettingsOpen(false);
  };

  /**
   * Handles the state changes and opens the editor 
   * menu.
   */
  const handleEditorToggle = () => {
    setEditorOpen((prevEditorOpen) => !prevEditorOpen);
  };

  /**
   * Handles the state changes and closes the editor menu.
   * @param {event} event the event.
   */
  const handleEditorClose = (event) => {
    if (editorAnchorRef.current && editorAnchorRef.current.contains(event.target)) {
      return;
    }

    setEditorOpen(false);
  };

  /**
   * The previous state of the settings menu.
   */
  const prevSettingsOpen = React.useRef(settingsOpen);
  React.useEffect(() => {
    if (prevSettingsOpen.current === true && settingsOpen === false) {
      settingsAnchorRef.current.focus();
    }

    prevSettingsOpen.current = settingsOpen;
  }, [settingsOpen]);

  /**
   * The previous state of the editor menu.
   */
  const prevEditorOpen = React.useRef(editorOpen);
  React.useEffect(() => {
    if (prevEditorOpen.current === true && editorOpen === false) {
      editorAnchorRef.current.focus();
    }

    prevEditorOpen.current = editorOpen;
  }, [editorOpen]);
  
  /**
   * The components that make up the PageHeader.
   */
  return (
      <div className={classes.root}>
      <AppBar elevation={0} position="fixed" className={classes.bar}>
          <Toolbar>
          <Typography variant="App-header" className={classes.title}>
              ICEcΔp v1.0
          </Typography>
          <Button onClick={goToHome} className={classes.button} variant="App-header" color="inherit">ICEcΔp Home</Button>
          <Button onClick={goToTutorial} className={classes.button} variant="App-header" color="inherit">Tutorial</Button>
          <Button ref={editorAnchorRef} onClick={handleEditorToggle} className={classes.button} variant="App-header" color="inherit">Editor</Button>
          <Popper open={editorOpen} aria-haspopup="true" aria-controls={editorOpen ? 'menu-list-grow' : undefined} anchorEl={editorAnchorRef.current} role={undefined} transition disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
              >
                <Paper style={{backgroundColor: props.hColor}}>
                  <ClickAwayListener onClickAway={handleEditorClose}>
                    <MenuList autoFocusItem={editorOpen} id="menu-list-grow">
                      <MenuItem style={{whiteSpace: 'break-spaces'}} onClick={goToLive}>
                      <CodeIcon style={{ backgroundColor: props.iColor, color: props.tColor, borderRadius: 20, padding: 5}}></CodeIcon>
                      <span>     </span>
                      <Typography className={classes.menuText}>
                        Live Editor
                      </Typography>
                      </MenuItem>
                      <MenuItem style={{whiteSpace: 'break-spaces'}} onClick={goToStatic}>
                      <InsertDriveFileIcon style={{ backgroundColor: props.iColor, color: props.tColor, borderRadius: 20, padding: 5}}></InsertDriveFileIcon>
                      <span>     </span>
                      <Typography className={classes.menuText}>
                        Static Editor
                      </Typography>
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
          
          {/* <Button onClick={goToResources} className={classes.button} variant="App-header" color="inherit">Resources</Button> */}
          <Button ref={settingsAnchorRef} onClick={handleSettingsToggle} className={classes.button} variant="App-header" color="inherit">Settings</Button>
          <Popper open={settingsOpen} aria-haspopup="true" aria-controls={settingsOpen ? 'menu-list-grow' : undefined} anchorEl={settingsAnchorRef.current} role={undefined} transition disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
              >
                <Paper style={{backgroundColor: props.hColor}}>
                  <ClickAwayListener onClickAway={handleSettingsClose}>
                    <MenuList autoFocusItem={settingsOpen} id="menu-list-grow">
                      <MenuItem style={{whiteSpace: 'break-spaces'}}>
                        <Brightness2Icon style={{ backgroundColor: props.iColor, color: props.tColor, borderRadius: 20, padding: 5}}></Brightness2Icon>
                        <span>     </span>
                        <Typography className={classes.menuText}>
                          Dark Mode
                        </Typography>
                        <span>        </span>
                        <Switch
                          color="primary"
                          classes={switchStyles}
                          checked={darkToggle}
                          onChange={handleDarkToggle}
                        />
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
          <Button className={classes.button} variant="App-header" target="_blank" href="https://docs.google.com/forms/d/1A8qwG5T8pZIKmCaPYYSiEoqgzKsWMKBYmpUAqJ4zWw0/prefill" color="inherit">contact us</Button>
          </Toolbar>
      </AppBar>
      </div>
  );
}