import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import OrderPanel from './components/OrderPanel'
import OrderLineItemPanel from './components/OrderLineItemPanel'

class App extends Component {
  render() {
    return (
      <div>
        <OrderPanel bsStyle="primary"/>
        <OrderLineItemPanel />
      </div>
    );
  }
}

export default App;
