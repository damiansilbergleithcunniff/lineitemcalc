import React, { Component } from 'react';
import {Panel} from 'react-bootstrap';
import LineItemTable from './LineItemTable'
import OrderLineItemHeader from './OrderLineItemHeader'

class OrderLineItemPanel extends Component{
  // constructor(props){
  //   super(props);
  // }

  makeHeader(){
    return <OrderLineItemHeader onAddClick={this.props.onLineItemAdd} buttonDisabled={this.props.editingLineItem} />
  }

  render(){
    return(
      <Panel bsStyle="default" header={this.makeHeader()}>
        <LineItemTable lineItems={this.props.lineItems}
                       onLineItemUpdate={this.props.onLineItemUpdate}
                       onLineItemRemove={this.props.onLineItemRemove}
                       onLineItemEdit={this.props.onLineItemEdit}
                       onLineItemEditCancel={this.props.onLineItemEditCancel} />
      </Panel>
    );
  }
}

export default OrderLineItemPanel;