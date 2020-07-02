import React, { Component } from 'react';
import './App.css';
import StepperPage from './components/StepperPage';
import PageHeader from './components/PageHeader';
import MainInfoPage from './components/MainInfoPage';
import TutorialPage from './components/TutorialPage';

/**
 * The main App for ICEcap. The component consists of the
 * PageHeader, the MainInfoPage and the StepperPage.
 */
class App extends Component {
  render() {
    return (
      <div className='App-body'>
          <PageHeader></PageHeader>
          <MainInfoPage></MainInfoPage>
          <TutorialPage></TutorialPage>
          <StepperPage></StepperPage>
      </div>
    );
  }
}

export default App;