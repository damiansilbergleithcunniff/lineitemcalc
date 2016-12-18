import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import OrderPanel from './components/OrderPanel'
import OrderLineItemPanel from './components/OrderLineItemPanel'
import * as orderlib from './lib/lineitem'

(function(){
  console.log('starting up');
  console.log('building order');

}());

class App extends Component {
  constructor(props){
    super(props);
    this.order = orderlib.order([],0,2,3);
  }



  render() {
    return (
      <div className="container">
        <OrderPanel bsStyle="primary" order={this.order}/>
        <OrderLineItemPanel lineItems={this.order.lineItems}/>
      </div>
    );
  }
}

export default App;
