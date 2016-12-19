import React, { Component } from 'react';
import {Panel} from 'react-bootstrap';
import LineItemTable from './LineItemTable'
import OrderLineItemHeader from './OrderLineItemHeader'

class OrderLineItemPanel extends Component{
  constructor(props){
    super(props);
  }

  makeHeader(){
    return <OrderLineItemHeader onAddClick={this.props.onAddLineItem}/>
  }

  render(){
    return(
      <Panel bsStyle="default" header={this.makeHeader()}>
        <LineItemTable lineItems={this.props.lineItems} onLineItemUpdate={this.props.onLineItemUpdate}/>
      </Panel>
    );
  }
}

export default OrderLineItemPanel;