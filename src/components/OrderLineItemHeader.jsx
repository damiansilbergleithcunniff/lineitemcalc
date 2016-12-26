import React, { Component } from 'react';
import {Grid} from 'react-bootstrap';
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import OrderLineItemHeaderText from './OrderLineItemHeaderText'

// Events:
//  onAddClick(): fired when the add button is clicked
// props:
//  buttonDisabled: True if the button should be rendered disabled
//  orderSubtotal: the subtotal of the order
//  lineItemSubtotal: the subtotal of the lineItems
class OrderLineItemHeader extends Component{
  render(){
    const difference = this.props.orderSubtotal - this.props.lineItemSubtotal;
    return(
      <div>
        <Grid fluid>
          <Row>
            <Col md={10}>
              <OrderLineItemHeaderText text="Order Line Items: "
                                       difference={difference}
                                       lineItemSubtotal={this.props.lineItemSubtotal}/>
            </Col>
            <Col md={2}>
              <Button bsStyle="success"
                      bsSize="xsmall"
                      disabled={this.props.buttonDisabled}
                      onClick={this.props.onAddClick}>Add Line Item</Button>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default OrderLineItemHeader