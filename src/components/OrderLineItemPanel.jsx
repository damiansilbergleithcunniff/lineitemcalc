import React, { Component } from 'react';
import {Panel} from 'react-bootstrap';
import LineItemTable from './LineItemTable'

class OrderLineItemPanel extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <Panel bsStyle="default" header="Order Line Items">
        <LineItemTable lineItems={this.props.lineItems} onLineItemUpdate={this.props.onLineItemUpdate}/>
      </Panel>
    );
  }
}

export default OrderLineItemPanel;