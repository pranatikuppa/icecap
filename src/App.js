import React, { Component } from 'react';
import './App.css';
import StepperPage from './components/StepperPage';
import PageHeader from './components/PageHeader';
import MainInfoPage from './components/MainInfoPage';

class App extends Component {
  render() {
    return (
      <div className='App-body'>
          <PageHeader></PageHeader>
          <MainInfoPage></MainInfoPage>
          <StepperPage></StepperPage>
      </div>
    );
  }
}

export default App;