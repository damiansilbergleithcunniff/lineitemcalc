import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import OrderPanel from './components/OrderPanel'
import OrderLineItemPanel from './components/OrderLineItemPanel'
import * as lineItemLib from './lib/lineitem'

// React Application which renders an 'order' and its 'lineItems'
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      order: this.makeOrder(),
    };

    this.handleOrderSubtotalChange = this.handleOrderSubtotalChange.bind(this);
    this.handleOrderShippingChange = this.handleOrderShippingChange.bind(this);
    this.handleOrderTaxChange = this.handleOrderTaxChange.bind(this);

    this.handleLineItemUpdate = this.handleLineItemUpdate.bind(this);
    this.handleLineItemAdd = this.handleLineItemAdd.bind(this);
    this.handleLineItemEdit = this.handleLineItemEdit.bind(this);
    this.handleLineItemEditCancel = this.handleLineItemEditCancel.bind(this);
    this.handleLineItemRemove = this.handleLineItemRemove.bind(this);

    this.handleKeyPress = this.handleKeyPress.bind(this);



  }

  handleKeyPress(e){
    switch(e.key){
      // case 'Enter':
      //   this.handleEdit(null);
      //   e.preventDefault();
      //   break;
      case 'a':
        if (e.ctrlKey || e.metaKey || e.altKey){
          this.handleLineItemAdd();
          e.preventDefault();
        }
        break;
      default:
        break;
    }
  }

  handleOrderSubtotalChange(e){
    let newValue = e.target.value;
    let order = this.state.order;
    order.subtotal = Number(newValue);
    this.setState({order: order});
  }
  handleOrderShippingChange(e){
    let newValue = e.target.value;
    let order = this.state.order;
    order.shipping = Number(newValue);
    order.updateLineItems();
    this.setState({order: order});
  }
  handleOrderTaxChange(e){
    let newValue = e.target.value;
    let order = this.state.order;
    order.tax = Number(newValue);
    order.updateLineItems();
    this.setState({order: order});
  }

  handleLineItemUpdate(lineItem, newValues){
    let order = this.state.order;
    let itemToUpdate = order.lineItems.filter((l) => {
        return l === lineItem;
      }
    )[0];
    itemToUpdate.description = newValues.description;
    itemToUpdate.ASIN = newValues.ASIN;
    itemToUpdate.quantity = newValues.quantity;
    itemToUpdate.item.cost.price = newValues.price;
    this.setState({
      order: order,
      editingLineItem: false
    });
  }
  handleLineItemEdit(lineItem){
    this.setState({
      editingLineItem: true
    });
  }
  handleLineItemEditCancel(){
    console.log('handleLineItemEditCancel');
    this.setState({
      editingLineItem: false
    });
  }
  handleLineItemAdd(){
    if(!this.state.editingLineItem){
      let order = this.state.order;
      order.lineItems.push(lineItemLib.lineItem(lineItemLib.item('','',0),1));
      this.setState({
        order: order,
        editingLineItem: true
      });
    }
  }
  handleLineItemRemove(lineItem){
    let order = this.state.order;
    order.lineItems.forEach((item, n) => {
      if(item === lineItem){
        order.lineItems.splice(n, 1);
        return item;
      }
    });
    this.setState({
      order: order
    });
  }

  makeOrder(){
    var order = lineItemLib.order(this.makeLineItems(), 116.00, 5.99, 8.54);
    return order;
  }
  makeLineItems(){
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

    return lineItems;
  }

  render() {
    const lineItems = this.state.order.lineItems;
    const order = this.state.order;
    return (
      <div className="container" tabIndex="0" onKeyUp={this.handleKeyPress}>
        <OrderPanel bsStyle="primary" order={order}
                    onSubtotalChange={this.handleOrderSubtotalChange}
                    onShippingChange={this.handleOrderShippingChange}
                    onTaxChange={this.handleOrderTaxChange} />

        <OrderLineItemPanel lineItems={lineItems}
                            editingLineItem={this.state.editingLineItem}
                            onLineItemUpdate={this.handleLineItemUpdate}
                            onLineItemAdd={this.handleLineItemAdd}
                            onLineItemRemove={this.handleLineItemRemove}
                            onLineItemEdit={this.handleLineItemEdit}
                            onLineItemEditCancel={this.handleLineItemEditCancel} />
      </div>
    );
  }
}

export default App;
