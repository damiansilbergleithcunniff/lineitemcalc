import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import OrderPanel from './components/OrderPanel'
import OrderLineItemPanel from './components/OrderLineItemPanel'
import * as lineItemLib from './lib/lineitem'

(function(){
  console.log('starting up');
  console.log('building order');

}());

class App extends Component {
  constructor(props){
    super(props);
    this.order = this.makeOrder();

    this.handleLineItemUpdate = this.handleLineItemUpdate.bind(this);
    this.handleAddLineItem = this.handleAddLineItem.bind(this);
  }

  handleLineItemUpdate(ASIN, newValues){
    let itemToUpdate = this.order.lineItems.filter((lineItem) => {
        return lineItem.ASIN === ASIN;
      }
    )[0];
    itemToUpdate.description = newValues.description;
    itemToUpdate.ASIN = newValues.ASIN;
    itemToUpdate.quantity = newValues.quantity;
    itemToUpdate.item.cost.price = newValues.price / newValues.quantity;
  }

  handleAddLineItem(){
    console.log('adding line item');
  }

  makeOrder(){
    var candle1 = lineItemLib.item('111625166', 'Roasted Chestnut & Cherries 3-Wick Candle', 8.5);
    var candle2 = lineItemLib.item('86718036','Midnight Blue Citrus 3-Wick Candle', 8.5);
    var candle3 = lineItemLib.item("111625186", "Frosty Air 3-Wick Candle", 8.5);
    var candle4 = lineItemLib.item("111625156", "Smoked Vanilla 3-Wick Candle", 8.5);
    var candle5 = lineItemLib.item("111625146", "Iced Vanilla Woods 3-Wick Candle", 8.5);
    var other = lineItemLib.item("105391086", "White Barn Fresh 6-Pack Wallflowers Sampler", 22.50);

    var lineItems = [
      lineItemLib.lineItem(candle1, 2),
      lineItemLib.lineItem(candle2, 3),
      lineItemLib.lineItem(candle3, 2),
      lineItemLib.lineItem(candle4, 2),
      lineItemLib.lineItem(candle5, 2),
      lineItemLib.lineItem(other, 1)];

    var order = lineItemLib.order(lineItems, 116.00, 5.99, 8.54);
    lineItems.forEach(function(lineItem){
      console.log(lineItem.description + ': ' + lineItem.ASIN);
      console.log(lineItem.item.cost.total())
    });

    return order;
  }

  render() {
    return (
      <div className="container">
        <OrderPanel bsStyle="primary" order={this.order}/>
        <OrderLineItemPanel onAddLineItem={this.handleAddLineItem} lineItems={this.order.lineItems} onLineItemUpdate={this.handleLineItemUpdate} />
      </div>
    );
  }
}

export default App;
