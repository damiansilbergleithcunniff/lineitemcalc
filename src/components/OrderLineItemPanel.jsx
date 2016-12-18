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
        <LineItemTable />
      </Panel>
    );
  }
}

export default OrderLineItemPanel;