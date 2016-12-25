import React, { Component } from 'react';
import {Grid} from 'react-bootstrap';
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {Label} from 'react-bootstrap';
import * as accounting from 'accounting';

// Events:
//  onAddClick(): fired when the add button is clicked
// props:
//  buttonDisabled: True if the button should be rendered disabled
//  orderSubtotal: the subtotal of the order
//  lineItemSubtotal: the subtotal of the lineItems
class OrderLineItemHeader extends Component{
  renderLineItemTotal(){
    return <span>{accounting.formatMoney(this.props.lineItemSubtotal)}</span>
  }
  renderDifference(){
    const difference = (this.props.orderSubtotal - this.props.lineItemSubtotal);
    const absDifference = Math.abs(difference);
    if (absDifference < .009) {
      return "";
    } else if(difference < 0) {
      return <Label bsStyle="success">Over by: {accounting.formatMoney(absDifference)}</Label>;
    } else if(difference > 0) {
      return <Label bsStyle="danger">Short by: {accounting.formatMoney(absDifference)}</Label>;
    }
  }
  render(){
    return(
      <Grid fluid>
        <Row>
          <Col md={10}>Order Line Items: [{this.renderLineItemTotal()}]{this.renderDifference()}</Col>
          <Col md={2}><Button bsStyle="success" bsSize="xsmall" disabled={this.props.buttonDisabled} onClick={this.props.onAddClick}>Add Line Item</Button></Col>
        </Row>
      </Grid>
    );
  }
}

export default OrderLineItemHeader