import React, { Component } from 'react';
import {Panel} from 'react-bootstrap';
import LineItemTable from './LineItemTable'
import OrderLineItemHeader from './OrderLineItemHeader'

// React Component to render a panel that shows a header with an add button and the lineItemTable
// Events:
//  onLineItemAdd(): fired when a new line item is to be added to the list of lineItems in the order
//  onLineItemUpdate(lineItem, newValues): fired when an update to a lineItem is made
//    lineItem: the lineItem which is being updated
//    newValues: an object that contains the updated values.  Property names match the lineItem's properties
//  onLineItemRemove(lineItem): fired when a lineItem is to be removed from the order
//    lineItem: the lineItem which should be removed
//  onLineItemEdit(lineItem): fired when a lineItem is being edited
//    lineItem: the lineItem which is to be edited
//  onLineItemEditCancel(): fired when a cancel is called on a lineItem.  Used to notify parents of the state change.
// props:
//  order: the order being edited, lineItems will be displayed in the table
//  editingLineItem: true if control is currently editing a lineItem
class OrderLineItemPanel extends Component{

  makeHeader(){
    let lineItemSubtotal = 0;
    this.props.order.lineItems.forEach((lineItem) => lineItemSubtotal += lineItem.cost.price());

    return <OrderLineItemHeader buttonDisabled={this.props.editingLineItem}
                                orderSubtotal={this.props.order.subtotal}
                                lineItemSubtotal={lineItemSubtotal}
                                onAddClick={this.props.onLineItemAdd} />
  }

  render(){
    return(
      <Panel bsStyle="default" header={this.makeHeader()}>
        <LineItemTable lineItems={this.props.order.lineItems}
                       onLineItemUpdate={this.props.onLineItemUpdate}
                       onLineItemRemove={this.props.onLineItemRemove}
                       onLineItemEdit={this.props.onLineItemEdit}
                       onLineItemEditCancel={this.props.onLineItemEditCancel} />
      </Panel>
    );
  }
}

export default OrderLineItemPanel;