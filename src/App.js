import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import OrderPanel from './components/OrderPanel'

class App extends Component {
  render() {
    return (
      <OrderPanel bsStyle="primary"/>
    );
  }
}

export default App;
