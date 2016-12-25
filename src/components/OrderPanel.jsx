import React, { Component } from 'react';
import {Grid} from 'react-bootstrap';
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import {Panel} from 'react-bootstrap';
import CurrencyBox from './CurrencyBox'

// React Component which displays the Order details using React Bootstrap
// Events:
//  onSubtotalChange(event): raised when the subtotal is changed.
//    event: the React Synthetic Event raised by the onChange
//  onShippingChange(event): raised when the shipping is changed.
//    event: the React Synthetic Event raised by the onChange
//  onTaxChange(event): raised when the tax is changed.
//    event: the React Synthetic Event raised by the onChange
// props:
//  order: the order to display
class OrderPanel extends Component{
  render(){
    return(
      <Panel header="Order Totals" bsStyle={this.props.bsStyle}>
        <Grid fluid> 
          <Row>
            <Col lg={3} md={3}>
              <CurrencyBox controlId="Subtotal"
                           label="Order Subtotal:"
                           value={this.props.order.subtotal}
                           placeholder="Subtotal"
                           onBlur={this.props.onSubtotalChange}/>
            </Col>
            <Col lg={3} md={3}>
              <CurrencyBox controlId="Shipping"
                           label="Order Shipping:"
                           value={this.props.order.shipping}
                           placeholder="Shipping"
                           onBlur={this.props.onShippingChange}/>
            </Col>
            <Col lg={3} md={3}>
              <CurrencyBox controlId="Tax"
                           label="Order Tax:"
                           value={this.props.order.tax}
                           placeholder="Tax"
                           onBlur={this.props.onTaxChange}/>
            </Col>
            <Col lg={3} md={3}>
              <CurrencyBox controlId="Total"
                           label="Order Total:"
                           value={this.props.order.total()}
                           readOnly={true}
                           placeholder="Total" />
            </Col>
          </Row>
        </Grid>
      </Panel>
    )
  }
}

export default OrderPanel;